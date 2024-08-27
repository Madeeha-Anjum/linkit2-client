import { CopyIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useCopyToClipboard } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { Api } from '@/linkitServerApi';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ShortenedLinkCardProps {
  linkId: string;
}

export default function ShortenedLinkCard({ linkId }: ShortenedLinkCardProps) {
  const [copiedText, copy] = useCopyToClipboard();
  const { toast } = useToast();
  const linkRecordQuery = useQuery({
    queryKey: [linkId],
    queryFn: async () => {
      await sleep(1000);
      return await Api.findLinkRecordWithId(linkId);
    },
  });

  if (linkRecordQuery.isPending) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20" />
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm">id: {linkId}</p>
          </CardFooter>
        </Card>
      </>
    );
  }

  if (linkRecordQuery.isError) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>
              Something went wrong! (Status Code: {linkRecordQuery.status})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{linkRecordQuery.error.message}</p>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm">id: {linkId}</p>
          </CardFooter>
        </Card>
      </>
    );
  }

  const linkRecord = linkRecordQuery.data;

  function onClick() {
    const shortenedUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      '/' +
      linkRecord.slug;

    copy(shortenedUrl)
      .then(() => {
        toast({
          title: 'Copied to clipboard',
          description: shortenedUrl,
        });
      })
      .catch((error) => {
        toast({
          title: 'Failed to copy to clipboard',
          description: error.message,
        });
      });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Button variant="ghost" className="text-md" onClick={onClick}>
              <CopyIcon className="mr-2 h-5 w-5" />
              {window.location.host + '/' + linkRecord.slug}
            </Button>

            <Link
              href={
                window.location.protocol +
                '//' +
                window.location.host +
                '/' +
                linkRecord.slug
              }
              target="_blank"
            ></Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md p-4 text-sm overflow-x-auto">
            <code className=" ">
              {JSON.stringify(linkRecordQuery.data, null, 2)}
            </code>
          </pre>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">id: {linkId}</p>
        </CardFooter>
      </Card>
    </>
  );
}
