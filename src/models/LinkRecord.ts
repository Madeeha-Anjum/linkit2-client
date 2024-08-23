import dayjs from 'dayjs';
import { z } from 'zod';

const linkRecordServerSchema = z.object({
  _id: z.string(),
  original_url: z.string(),
  slug: z.string(),
  created_at: z.string().datetime(),
  access: z.object({
    last_accessed_at: z.string().datetime(),
    access_count: z.number(),
  }),
  expiry: z.object({
    expires_at: z.string().datetime(),
    max_access_count: z.number(),
  }),
});

type LinkRecordServer = z.infer<typeof linkRecordServerSchema>;

const linkRecordSchema = linkRecordServerSchema.transform(
  (linkRecordServer) => ({
    id: linkRecordServer._id,
    originalUrl: linkRecordServer.original_url,
    slug: linkRecordServer.slug,
    createdAt: dayjs(linkRecordServer.created_at),
    access: {
      lastAccessedAt: dayjs(linkRecordServer.access.last_accessed_at),
      accessCount: linkRecordServer.access.access_count,
    },
    expiry: {
      expiresAt: dayjs(linkRecordServer.expiry.expires_at),
      maxAccessCount: linkRecordServer.expiry.max_access_count,
    },
  }),
);

type LinkRecord = z.infer<typeof linkRecordSchema>;

export { linkRecordSchema, type LinkRecord };
