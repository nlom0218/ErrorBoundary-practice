// import { useState } from 'react';

import { useEffect, useState } from 'react';

// function wrapPromise<T>(promise: Promise<T>) {
//   let status = 'pending'; // 최초의 상태
//   let result: Error | T;
//   // 프로미스 객체 자체
//   const suspender = promise.then(
//     (r) => {
//       status = 'success'; // 성공으로 완결시 success로
//       result = r;
//     },
//     (e) => {
//       status = 'error'; // 실패로 완결시 error로
//       result = e;
//     }
//   );
//   // 위의 Suspense For Data Fetching 예제에서의 read() 메소드입니다.
//   // 위 함수의 로직을 클로저삼아, 함수 밖에서 프로미스의 진행 상황을 읽는 인터페이스가 된다
//   return {
//     read() {
//       if (status === 'pending') {
//         throw suspender; // 펜딩 프로미스를 throw 하면 Suspense의 Fallback UI를 보여준다
//       } else if (status === 'error') {
//         throw result as Error; // Error을 throw하는 경우 ErrorBoundary의 Fallback UI를 보여준다
//       } else if (status === 'success') {
//         return result as T; // 결과값을 리턴하는 경우 성공 UI를 보여준다
//       }
//     },
//   };
// }

// // const useQuery = async <T>(path: string) => {
// //   try {
// //     const response = await fetch(path);
// //     const promiseData = response.json() as Promise<T>;

// //     return wrapPromise(promiseData);
// //   } catch (error) {
// //     if (error instanceof Error) throw error;
// //   }
// // };

// const cache = new Map();
// const pending = new Map();
// //! perform하는 로직, effect를 발생시킴, what
// function fetchTextSync(url: string) {
//   if (cache.has(url)) {
//     return cache.get(url); // 캐시 맵객체
//   }
//   if (pending.has(url)) {
//     throw pending.get(url); // Pending Promise throw
//   }
//   // 비동기 로직
//   const promise = fetch(url)
//     .then((response) => response.text()) // 처리되는 경우
//     .then((text) => {
//       pending.delete(url);
//       cache.set(url, text);
//     });
//   pending.set(url, promise); // 팬딩 객체에 팬딩인거 표시
//   throw promise;
// }

// async function runPureTask(task) {
//   for (;;) {
//     // while true
//     //!!! 태스크를 리턴할 수 있을 때까지 바쁜대기를 함(무한루프) !!!
//     try {
//       return task(); // 태스크 값을 리턴할 수 있게 되면 무한루프에서 벗어난다
//     } catch (x) {
//       // throw를 거른다
//       if (x instanceof Promise) {
//         await x; // pending promise가 throw된 경우 await으로 resolve 시도 => suspense
//       } else {
//         throw x; // Error가 throw된 경우 그대로 error throw => ErrorBoundary, 종료
//       }
//     }
//   }
// }

const useQuery = async <T>(url: string) => {
  const cache = new Map<string, string>();
  const pending = new Map<string, Promise<void>>();

  const [result, setResult] = useState<'pending' | 'rejected' | 'fulfilled'>(
    'pending'
  );

  const fetchTextSync = () => {
    if (cache.has(url)) {
      return cache.get(url); // 캐시 맵객체
    }
    if (pending.has(url)) {
      throw pending.get(url); // Pending Promise throw
    }
    // 비동기 로직
    const promise = fetch(url)
      .then((response) => response.text()) // 처리되는 경우
      .then((text) => {
        pending.delete(url);
        cache.set(url, text);
      });

    pending.set(url, promise); // 팬딩 객체에 팬딩인거 표시
    throw promise;
  };

  const runPureTask = async () => {
    for (;;) {
      // while true
      //!!! 태스크를 리턴할 수 있을 때까지 바쁜대기를 함(무한루프) !!!
      try {
        return fetchTextSync(); // 태스크 값을 리턴할 수 있게 되면 무한루프에서 벗어난다
      } catch (x) {
        // throw를 거른다
        if (x instanceof Promise) {
          setResult('pending');
          await x; // pending promise가 throw된 경우 await으로 resolve 시도 => suspense
        } else {
          setResult('rejected');
          throw x; // Error가 throw된 경우 그대로 error throw => ErrorBoundary, 종료
        }
      }
    }
  };

  useEffect(() => {
    runPureTask();
  }, []);

  return result;
};

export default useQuery;
