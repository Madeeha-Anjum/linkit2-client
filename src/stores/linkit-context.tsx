'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useToast } from '@/components/ui/use-toast';
import { Api } from '@/linkitServerApi';
import { LinkRecord } from '@/models/LinkRecord';
import { LinkRecordId } from '@/models/LinkRecordId';

interface LinkItContextValue {
  linkIds: LinkRecordId[];
  linkRecords: LinkRecord[];
  addLinkRecordId: (linkRecordId: LinkRecordId) => void;
}

const LinkItContext = createContext<LinkItContextValue | null>(null);

interface LinkItContextProps {
  children: React.ReactNode;
}

function LinkItContextProvider({ children }: LinkItContextProps) {
  const [linkIds, setLinkIds] = useLocalStorage<LinkRecordId[]>(
    'linkit-context',
    [],
  );
  const { toast } = useToast();

  const linkRecordsQuery = useQuery({
    queryKey: linkIds,
    queryFn: async () => {
      const linkRecords = await Promise.all(
        linkIds.map((linkRecordId) => Api.findLinkRecordWithId(linkRecordId)),
      );
      return linkRecords;
    },
    enabled: linkIds.length > 0,
    initialData: [],
  });

  const linkItContextValue: LinkItContextValue = {
    linkIds: linkIds,
    linkRecords: linkRecordsQuery.data,
    addLinkRecordId: (linkRecordId: LinkRecordId) => {
      setLinkIds((prev) => [linkRecordId, ...prev]);
    },
  };

  return (
    <LinkItContext.Provider value={linkItContextValue}>
      {children}
    </LinkItContext.Provider>
  );
}

export default LinkItContext;
export { LinkItContextProvider };
