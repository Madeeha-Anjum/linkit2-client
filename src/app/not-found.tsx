import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <main className="">
        <div className="flex flex-col justify-start min-h-screen">
          <div className="mx-auto mt-20 prose text-center">
            <h1>Not Found</h1>
            <p>The page you are looking for was not found</p>
            <Link href="/">Return Home</Link>
          </div>
        </div>
      </main>
    </>
  );
}
