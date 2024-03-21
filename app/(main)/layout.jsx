'use client';
import Commonheader from '@/components/Common_Header';
import Common_footer from '@/components/Common_Footer';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  >
        
      <div>
      <Commonheader/>
      </div>
      {children}
      <div>
      <Common_footer/>
      </div>
      </body>
      
      
    </html>
  )
}
