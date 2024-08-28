import axios, { AxiosError, isAxiosError } from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getLinkitConstants } from '@/linkitConstants';
import { linkRecordSchema } from '@/models/LinkRecord';

interface Params {
  slug: string;
}

export default async function Page({ params }: { params: Params }) {
  console.log(params);

  try {
    const response = await axios(
      `${getLinkitConstants().SERVER_URL}/links/${params.slug}`,
    );

    if (response.data) {
      const linkRecord = linkRecordSchema.parse(response.data);

      redirect(linkRecord.originalUrl);
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status !== 404) {
        throw error;
      }
    } else {
      throw error;
    }
  }

  return (
    <main className="mx-auto mt-20 prose dark:prose-invert text-center">
      <h1>Link Not Found</h1>
      <p className="lead">
        The link for <strong>&quot;{params.slug}&quot;</strong> has expired or
        it does not exist.
      </p>
      <Link href="/">Return Home</Link>
    </main>
  );
}
