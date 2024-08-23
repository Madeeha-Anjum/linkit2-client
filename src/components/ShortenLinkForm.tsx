'use client';

import assert from 'assert';

import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Api } from '@/linkitServerApi';
import LinkItContext from '@/stores/linkit-context';

const FormSchema = z.object({
  originalUrl: z
    .string()
    .min(1, {
      message: 'URL is empty',
    })
    .url({
      message: 'Invalid URL',
    }),
});

export default function ShortenLinkForm() {
  const searchParams = useSearchParams();
  const linkItContext = useContext(LinkItContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      originalUrl: '',
    },
  });

  useEffect(() => {
    if (searchParams.get('prefill') === 'true') {
      const fakeLongUrl = faker.internet.url();
      console.log(fakeLongUrl);
      form.setValue('originalUrl', fakeLongUrl);
    }
  }, [searchParams, form, form.setValue]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const linkRecord = await Api.shortenLink(data.originalUrl);

    assert(linkItContext !== null, 'linksContext should not be null');
    linkItContext.addLinkRecordId(linkRecord.id);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original URL</FormLabel>
              <FormControl>
                <Input placeholder="Paste Your Link Here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit">Shorten</Button>
        </div>
      </form>
    </Form>
  );
}
