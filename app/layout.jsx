import { Inter } from 'next/font/google'
import './globals.css'
import Commonheader from '@/components/Common_Header';
import Common_footer from '@/components/Common_Footer';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ISA-Domain Selection',
  description: 'Welcome to INTERNATIONAL SOCIETY OF AUTOMATION (ISA), We are happy to introduce our domains!!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      {children}
      
      </body>
      
      
    </html>
  )
}
