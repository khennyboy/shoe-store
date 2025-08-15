export default function manifest() {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '512X512.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      }
    ],
  }
}
