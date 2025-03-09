import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenTool, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-10 text-center">
          <div className="relative mb-8">
            <div className="text-[10rem] font-bold text-primary/10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl md:text-3xl font-bold">
                Page Not Found
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for seems to have gone missing, just
            like that one slide in your presentation.
          </p>

          <div className="space-y-4">
            <Link href="/dashboard">
              <Button className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>

            <div className="pt-6 border-t mt-6">
              <p className="text-sm text-muted-foreground mb-2">
                Or try this link:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/create-page"
                  className="text-sm text-primary hover:underline"
                >
                  Create Presentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SlideSage. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
