import { useRouter } from 'next/router';
import { KeyboardEvent, useState } from 'react';

export const useRouterByEnter = (baseUrl: string, variable: string[]) => {
  const [isRouting, setIsRouting] = useState(false);

  const fullUrl = baseUrl + '/' + variable.join('/');
  const router = useRouter();

  const routerPushOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(fullUrl);
      setIsRouting(true);
    }
  };

  const routerClinkOnButton = (e: any) => {
    router.push(fullUrl);
  };

  return { isRouting, setIsRouting, routerPushOnKeyDown, routerClinkOnButton };
};
