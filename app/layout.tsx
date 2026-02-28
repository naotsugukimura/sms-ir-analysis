import type { Metadata } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar, MobileNav } from "@/components/layout/Sidebar";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "SMS IR分析 - 株式会社エス・エム・エス",
  description: "SMS（2175）の事業ポートフォリオ・ビジネスモデル・財務分析サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className={`${notoSansJP.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <TooltipProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-background/80 px-4 py-2 backdrop-blur-sm md:hidden">
                <MobileNav />
                <span className="text-sm font-bold">SMS IR分析</span>
              </div>
              <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
                {children}
              </div>
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
