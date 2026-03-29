import Link from "next/link";

export default function NotFound() {
  return (
    <div className="panel px-6 py-12 text-center sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl text-ink">That page is not here yet.</h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink/70">
        The portfolio structure is in place, but this route has not been filled
        in yet.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
      >
        Return Home
      </Link>
    </div>
  );
}
