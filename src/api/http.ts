import { APIError, isAPIError } from './common';

const http = {
  get: async <T>(url: string) => {
    const response = await fetch(url);
    const data: T = await response.json();

    if (response.ok) return data;

    if (isAPIError(data)) {
      console.log(data);
      throw new APIError(data.code, data.message);
    }

    throw new Error();
  },

  request: async (url: string, config: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...config,
      });

      const data = await response.json();

      if (response.ok) return data;

      if (isAPIError(data)) {
        throw new APIError(data.code, data.message);
      }
    } catch (error) {
      if (error instanceof APIError) throw error;
      if (error instanceof Error) throw error;
    }
  },

  post: async (url: string, config: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        ...config,
      });

      if (response.ok) return;

      const data = await response.json();

      if (response.ok) return data;

      if (isAPIError(data)) {
        throw new APIError(data.code, data.message);
      }
    } catch (error) {
      if (error instanceof APIError) throw error;
      if (error instanceof Error) throw error;
    }
  },

  delete: async (url: string, config: RequestInit = {}) => {
    try {
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
    } catch (error) {
      if (error instanceof APIError) throw error;
      if (error instanceof Error) throw error;
    }
  },
};

export default http;
