import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "제주공항 국내선 정보 모음",
  description: "About JEJU Airport",
};

const SUIT = localFont({
  src: [{
    path: "./fonts/SUIT-Light.otf",
    weight: '300',
    style: 'normal'
  },
  {
    path: "./fonts/SUIT-Regular.otf",
    weight: '400',
    style: 'normal'
  },
  {
    path: "./fonts/SUIT-Medium.otf",
    weight: '500',
    style: 'normal'
  },
  {
    path: "./fonts/SUIT-SemiBold.otf",
    weight: '600',
    style: 'normal'
  },
  {
    path: "./fonts/SUIT-Bold.otf",
    weight: '700',
    style: 'normal'
  }
  ]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SUIT.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
