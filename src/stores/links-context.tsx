'use client';

import { createContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { LinkRecord } from '@/models/LinkRecord';

interface LinksContextValue {
  linkRecord: LinkRecord | null;
  setLinkRecord: (linkRecord: LinkRecord) => void;
}

const LinksContext = createContext<LinksContextValue | null>(null);

interface LinksContextProps {
  children: React.ReactNode;
}

function LinksContextProvider({ children }: LinksContextProps) {
  const [linkRecord, setLinkRecord] = useLocalStorage<LinkRecord | null>(
    'link-record',
    null,
  );

  const linkContextValue: LinksContextValue = {
    linkRecord: linkRecord,
    setLinkRecord: (linkRecord: LinkRecord) => {
      setLinkRecord(linkRecord);
    },
  };

  return (
    <LinksContext.Provider value={linkContextValue}>
      {children}
    </LinksContext.Provider>
  );
}

export default LinksContext;
export { LinksContextProvider };
