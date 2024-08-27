'use client';

import { useContext } from 'react';

import LinkItContext from '@/stores/linkit-context';

import ShortenedLinkCard from './ShortenedLinkCard';

export default function ShortenedLink() {
  const linkItContext = useContext(LinkItContext);

  if (linkItContext === null) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {linkItContext.linkIds.map((linkId) => (
        <ShortenedLinkCard key={linkId} linkId={linkId} />
      ))}
    </div>
  );
}
