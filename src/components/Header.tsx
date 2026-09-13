import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b px-4 py-3">
      <nav className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/favourites">Favourites</Link>
        <Link href="/auth">Login</Link>
        <Link href="/health">Health</Link>
      </nav>
    </header>
  );
}
