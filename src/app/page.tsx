import Image from "next/image";

// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Zap, PenTool, Monitor } from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b flex items-center justify-center">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-md">
              <PenTool className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SlideSage</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Create Professional Presentations{" "}
              <span className="text-primary">Powered by AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your ideas into stunning presentations in seconds.
              SlideSage uses AI to generate complete presentations from simple
              outlines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/create-page">
                <Button size="lg" className="gap-2">
                  Create Your First Deck
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-16 relative">
            <div className="rounded-lg border shadow-xl overflow-hidden">
              <div className="bg-muted p-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm">
                  SlideSage - AI Presentation Generator
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <Image className="w-full" src={'/landing-page-img.png'} alt='landing page image' width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create stunning presentations without the
              hassle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                AI-Powered Generation
              </h3>
              <p className="text-muted-foreground">
                Create complete presentations from simple outlines or topics
                with our advanced AI.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Custom Templates</h3>
              <p className="text-muted-foreground">
                Choose from professionally designed templates or create your own
                custom layouts.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Smart Editing</h3>
              <p className="text-muted-foreground">
                Refine and customize your presentations with our intuitive
                editing tools.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Amazing Presentations?
              </h2>
              <p className="max-w-lg text-primary-foreground/80">
                Join thousands of professionals who save hours every week with
                SlideSage.
              </p>
            </div>
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="min-w-[180px]">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-1 rounded-md">
                  <PenTool className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold">SlideSage</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered presentation generator that transforms your ideas
                into professional slides in seconds.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Templates
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} SlideSage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
