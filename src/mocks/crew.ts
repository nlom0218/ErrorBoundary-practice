import { rest } from 'msw';

export const crewHandler = [
  rest.post('/api/crew', (req, res, ctx) => {
    const requestBody = req.body as { crewName: string };
    const crewName = requestBody.crewName;

    // crewName이 없는 경우
    if (!crewName)
      return res(
        ctx.status(403),
        ctx.json({ code: 1000, message: '이름을 입력하지 않았습니다.' })
      );

    // crewName이 빈 문자열인 경우
    if (crewName.trim() === '')
      return res(
        ctx.status(403),
        ctx.json({ code: 1001, message: '이름이 빈 문자열입니다.' })
      );

    // crewName의 길이가 2보다 작은 경우
    if (crewName.length < 2)
      return res(
        ctx.status(403),
        ctx.json({ code: 1002, message: '이름의 길이가 2보다 작습니다.' })
      );

    // crewName의 길이가 4보다 큰 경우
    if (crewName.length > 4)
      return res(
        ctx.status(403),
        ctx.json({ code: 1003, message: '이름의 길이가 4보다 큽니다.' })
      );

    // crewName에 숫자가 포함된 경우
    if (crewName.match(/[0-9]/g))
      return res(
        ctx.status(403),
        ctx.json({ code: 1004, message: '이름에 숫자가 포함되어 있습니다.' })
      );

    const crews = JSON.parse(localStorage.getItem('crews') || '[]') as string[];

    // 중복된 이름을 입력한 경우
    if (crews.includes(crewName))
      return res(
        ctx.status(403),
        ctx.json({ code: 1005, message: '이름이 중복되었습니다.' })
      );

    crews.push(crewName);

    localStorage.setItem('crews', JSON.stringify(crews));

    return res(ctx.status(201), ctx.json({ crewName }));
  }),

  rest.get('/api/crew', (_req, res, ctx) => {
    if (_req.url.search === '?error=server')
      return res(
        ctx.status(500),
        ctx.json({ code: 1300, message: '서버와 통신이 불안정 합니다.' })
      );

    const crews = JSON.parse(localStorage.getItem('crews') || '[]') as string[];

    return res(ctx.json(crews));
  }),

  rest.delete('/api/crew', (req, res, ctx) => {
    const requestBody = req.body as {
      managerCode: string | null;
      crewName: string;
    };

    const { managerCode, crewName } = requestBody;

    // 관리가 코드가 없는 경우
    if (!managerCode)
      return res(
        ctx.status(403),
        ctx.json({ code: 1100, message: '관리자코드를 입력하지 않았습니다.' })
      );

    if (managerCode !== 'ABC123')
      return res(
        ctx.status(403),
        ctx.json({ code: 1101, message: '관리자코드가 올바르지 않습니다.' })
      );

    const crews = JSON.parse(localStorage.getItem('crews') || '[]') as string[];

    if (!crews.includes(crewName))
      return res(
        ctx.status(403),
        ctx.json({ code: 1102, message: '등록되지 않는 크루입니다.' })
      );

    const newCrews = crews.filter((crew) => crew !== crewName);

    localStorage.setItem('crews', JSON.stringify(newCrews));

    return res(ctx.status(201), ctx.json(newCrews));
  }),
];
