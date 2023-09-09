import { rest } from 'msw';

const MOCK_CREW_LIST = [
  {
    nickname: '노아',
    team: '하루스터디',
  },
  {
    nickname: '엽토',
    team: '하루스터디',
  },
];

export const authHandler = [
  rest.get('/success/crew', (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(MOCK_CREW_LIST));
  }),

  rest.get('/fail/crew', (_req, res, ctx) => {
    return res(ctx.status(403), ctx.delay(1000));
  }),
];
