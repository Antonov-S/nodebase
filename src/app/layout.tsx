import { Provider } from "jotai";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Geist, Geist_Mono } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Nodebase - Automate everything (even the mistakes)",
  description:
    "Drag, drop, deploy. Build an AI-powered workflow platform with auth, subscriptions, background jobs, and just enough bugs to keep life interesting."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCReactProvider>
          <NuqsAdapter>
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
