"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

const NAVBAR_LINKS = [
  { label: "Styles", href: "/styles" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isAppPage = pathname === "/app";
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold tracking-tight text-white">
                PixelMuse AI
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {NAVBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-lime-400 font-semibold"
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {!isAppPage ? (
          <div className="hidden md:flex items-center">
            <Link href="/app">
              <Button className="bg-lime-400 text-black hover:bg-lime-300 rounded-l rounded-r">
                Create Image
              </Button>
            </Link>
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 bg-black/95 border-b border-white/10",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="container py-4 flex flex-col gap-4">
          {NAVBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-lime-400 font-semibold"
                  : "text-white/80 hover:text-white"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!isAppPage && (
            <Link
              href="/app"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block"
            >
              <Button className="w-full bg-lime-400 text-black hover:bg-lime-300 rounded-l rounded-r">
                Create Image
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
