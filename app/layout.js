import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'Luiz Felipe Barbosa',
  description:
    'UC Berkeley double major in Mathematics/Statistics and Media Studies. Quantitative analysis, documentary filmmaking, and policy advocacy.',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased text-[16px]">{children}</body>
    </html>
  )
}
