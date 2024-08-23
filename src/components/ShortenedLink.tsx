'use client';

import { useContext } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LinksContext from '@/stores/links-context';

import { Input } from './ui/input';

export default function ShortenedLink() {
  const linksContext = useContext(LinksContext);

  if (linksContext === null || linksContext.linkRecord === null) {
    return null;
  }

  const linkRecord = linksContext.linkRecord;
  const fullShortenedUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    '/' +
    linkRecord.slug;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{fullShortenedUrl}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={linkRecord.originalUrl}
            readOnly
            className="text-muted-foreground"
          />
        </CardContent>
      </Card>
    </>
  );
}
