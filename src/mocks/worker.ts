import { setupWorker } from 'msw';
import { authHandler } from './crew';

export const worker = setupWorker(...authHandler);
