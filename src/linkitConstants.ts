import { z } from 'zod';

const linkitConstantsSchema = z.object({
  SERVER_URL: z.string(),
});

function getLinkitConstants() {
  return linkitConstantsSchema.parse({
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  });
}

export { getLinkitConstants };
