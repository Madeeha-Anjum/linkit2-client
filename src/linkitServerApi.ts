import axios from 'axios';

import { getLinkitConstants } from './linkitConstants';
import { linkRecordSchema } from './models/LinkRecord';

const linkitConstants = getLinkitConstants();

const axiosInstance = axios.create({
  baseURL: linkitConstants.SERVER_URL,
});

class Api {
  static async shortenLink(originalUrl: string) {
    const response = await axiosInstance
      .post('/links/', {
        original_url: originalUrl,
      })
      .then((res) => res.data)
      .then((data) => linkRecordSchema.parse(data));

    return response;
  }

  static async findLinkRecordWithSlug(slug: string) {
    const response = await axiosInstance
      .get(`/links/${slug}`)
      .then((res) => res.data)
      .then((data) => linkRecordSchema.parse(data));

    return response;
  }

  static async findLinkRecordWithId(id: string) {
    const response = await axiosInstance
      .get(`/statistics/links/${id}`)
      .then((res) => res.data)
      .then((data) => linkRecordSchema.parse(data));

    return response;
  }
}

export { Api };
