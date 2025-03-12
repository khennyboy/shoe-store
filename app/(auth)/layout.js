import '../globals.css'

export default function AuthLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <div>{children}</div>
        </body>
      </html>
    );
  }
  