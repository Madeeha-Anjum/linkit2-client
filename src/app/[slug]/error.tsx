'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto mt-20 prose text-center">
      <h1 className="text-center">Something went wrong!</h1>
      <p className="lead">
        Please contact Pranav at{' '}
        <a href="mailto:b.pranav.k@gmail.com">b.pranav.k@gmail.com</a> or try
        again.
      </p>
      <Link href="/">Return Home</Link>
    </main>
  );
}
