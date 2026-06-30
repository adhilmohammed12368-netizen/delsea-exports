import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="404 — Page not found | Delsea Exports" />
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-medium">Lost at sea.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This page doesn't exist or has drifted away.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background"
          >
            Return home
          </Link>
        </div>
      </div>
    </>
  );
}
