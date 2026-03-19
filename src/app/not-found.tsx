import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-display font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground font-body">Oops! This destination doesn't exist.</p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
