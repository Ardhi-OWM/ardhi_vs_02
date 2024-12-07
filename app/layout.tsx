import type { Metadata } from "next";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";


import "./globals.css";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";


export const metadata: Metadata = {
  title: "Ardhi App",
  description: "Ardhi simplifies geospatial analysis, enabling users to visualize and download data effortlessly, supporting data-driven decisions across diverse industries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} >
      <html lang="en">
        <body className={`antialiased`}>
          <SignedIn>
            <Header />
          </SignedIn>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
