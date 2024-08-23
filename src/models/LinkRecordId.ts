import { z } from 'zod';

const linkRecordIdSchema = z.string();

type LinkRecordId = z.infer<typeof linkRecordIdSchema>;

export { linkRecordIdSchema, type LinkRecordId };
