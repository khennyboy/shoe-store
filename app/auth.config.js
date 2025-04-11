import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const authConfig = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  providers: [
    {
      id: "email-verification",
      name: "Email Verification",
      type: "email",
      async sendVerificationRequest({ identifier: email }) {
        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store code in Supabase
        const { error } = await supabase
          .from("verification_codes")
          .upsert({
            email,
            code,
            expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
          });
        
        if (error) throw new Error("Failed to store verification code");

        // Send email (using Supabase email or your service)
        const { error: emailError } = await supabase
          .from("emails")
          .insert({
            to: email,
            subject: "Your Verification Code",
            html: `Your code is: <strong>${code}</strong>`,
          });
        
        if (emailError) throw new Error("Failed to send email");
      },
    },
    // Add Google provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }) {
      if (account?.provider === "email-verification" && credentials?.code) {
        const { data, error } = await supabase
          .from("verification_codes")
          .select()
          .eq("email", user.email)
          .eq("code", credentials.code)
          .gt("expires_at", new Date())
          .single();

        if (error || !data) return false;
        
        await supabase
          .from("verification_codes")
          .delete()
          .eq("email", user.email);
      }
      
      // For Google sign-in
      if (account?.provider === "google") {
        return true;
      }
      
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account?.provider === "google" && profile) {
        token.email = profile.email;
        token.picture = profile.picture;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      if (token.picture) {
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
  },
  session: { strategy: "jwt" },
};