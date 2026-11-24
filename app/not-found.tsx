import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <p>404</p>
      <h1>This page is not in the archive.</h1>
      <Link href="/">Return home →</Link>
    </div>
  );
}
