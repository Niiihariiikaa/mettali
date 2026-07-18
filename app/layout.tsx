import React from "react"
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/cart-context'
import './globals.css'

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-space-mono' });

export const metadata: Metadata = {
  title: 'METTALI | Aluminium Furniture & Home Decor',
  description: 'Premium aluminium furniture and home decor for modern living. Where industrial strength meets refined elegance.',
  generator: 'v0.app',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${spaceMono.variable} font-sans antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
