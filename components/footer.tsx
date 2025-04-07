import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold">ZappyToon</span>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm text-white/60 hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-white/60 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/help"
              className="text-sm text-white/60 hover:text-white"
            >
              Help
            </Link>
          </nav>

          <div className="text-sm text-white/70">
            © 2025 ZappyToon. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
