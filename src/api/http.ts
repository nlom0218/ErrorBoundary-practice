import { APIError, isAPIError } from './common';

const http = {
  get: async <T>(url: string) => {
    const response = await fetch(url);
    const data: T = await response.json();

    if (response.ok) return data;

    if (isAPIError(data)) {
      throw new APIError(data.code, data.message);
    }

    throw new Error();
  },

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

  delete: async (url: string, config: RequestInit = {}) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      ...config,
    });

    const data = await response.json();

    if (response.ok) return data;

    if (isAPIError(data)) {
      throw new APIError(data.code, data.message);
    }

    throw new Error();
  },
};

export default http;
