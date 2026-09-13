import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-muted px-4 py-3">
      <nav className="flex gap-6">
        <Link href="/" className="hover:text-primary active:text-primary">
          Home
        </Link>
        <Link
          href="/favourites"
          className="hover:text-primary active:text-primary"
        >
          Favourites
        </Link>
        <Link href="/auth" className="hover:text-primary active:text-primary">
          Login
        </Link>
        <Link href="/health" className="hover:text-primary active:text-primary">
          Health
        </Link>
      </nav>
    </header>
  );
}
