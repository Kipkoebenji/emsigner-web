import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Emsigner",
  description: "This is a simple app to sign documents using Documenso.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lexend.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
