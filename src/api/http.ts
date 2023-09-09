import { APIError, isAPIError } from './common';

const http = {
  post: async (url: string, config: RequestInit = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      ...config,
    });

    if (response.ok) return;

    const data = await response.json();

    if (isAPIError(data)) {
      throw new APIError(data.code, data.message);
    }

    throw new Error();
  },
};

export default http;
