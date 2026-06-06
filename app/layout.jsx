import './globals.css'
import ClientLayout from './ClientLayout'

export const metadata = {
  title: 'LDH Portfolio',
  description: 'Portfolio migrated to Next.js',
  manifest: '/favicon/manifest.json',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: ['/favicon/favicon.ico'],
    apple: [
      { url: '/favicon/apple-icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-config': '/favicon/browserconfig.xml',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
