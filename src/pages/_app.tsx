// 모든페이지에 적용되는 파일
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { DehydratedState } from '@tanstack/react-query';

import { Footer, Header } from 'src/components/common';
import { GlobalStyles } from 'src/style/global';
import theme from 'src/style/theme';
import 'public/fonts/style.css';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <BackgroundWrapper>
              <Header />
              <GlobalStyles />
              <Component {...pageProps} />
              <Footer />
            </BackgroundWrapper>
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;

const BackgroundWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[800]};
`;
