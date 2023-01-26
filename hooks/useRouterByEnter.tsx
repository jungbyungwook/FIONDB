import { useRouter } from 'next/router';
import type { KeyboardEvent } from 'react';

export const useRouterByEnter = (baseUrl: string, variable: string[]) => {
  const fullUrl = baseUrl + '/' + variable.join('/');
  const router = useRouter();

  const routerPushOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') router.push(fullUrl);
  };

  const routerClinkOnButton = (e: any) => {
    router.push(fullUrl);
  };

  return { routerPushOnKeyDown, routerClinkOnButton };
};
