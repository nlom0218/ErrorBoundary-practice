import { setupWorker } from 'msw';
import { crewHandler } from './crew';

export const worker = setupWorker(...crewHandler);
