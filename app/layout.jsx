import './globals.css'
import ClientLayout from './ClientLayout'

export const metadata = {
  title: 'LDH Portfolio',
  description: 'Portfolio migrated to Next.js',
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
