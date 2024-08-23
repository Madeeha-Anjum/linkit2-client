'use client';

import { useContext } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LinkItContext from '@/stores/linkit-context';

import { Input } from './ui/input';

export default function ShortenedLink() {
  const linkItContext = useContext(LinkItContext);

  if (linkItContext === null || linkItContext.linkRecords.length === 0) {
    return null;
  }

  const linkRecords = linkItContext.linkRecords;
  const fullShortenedUrl = (slug: string) =>
    window.location.protocol + '//' + window.location.host + '/' + slug;

  return (
    <div className="grid grid-cols-1 gap-6">
      {linkRecords.map((linkRecord) => (
        <Card key={linkRecord.id}>
          <CardHeader>
            <CardTitle>{fullShortenedUrl(linkRecord.slug)}</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md p-4 text-sm overflow-x-auto">
              <code className=" ">{JSON.stringify(linkRecord, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
