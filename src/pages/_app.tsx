// 모든페이지에 적용되는 파일
import type { AppProps } from 'next/app';
import styled, { createGlobalStyle } from 'styled-components';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { Header, Footer } from '@components';
import { useState } from 'react';
import type { DehydratedState } from '@tanstack/react-query';
import type { NextPageContext } from 'next';

// type PageProps = {
//   dehydratedState?: DehydratedState;
// };

// type ExtendedAppProps<P = {}> = {
//   err?: NextPageContext['err'];
// } & AppProps<P>;

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <BackgroundWrapper>
            <Header />
            <GlobalStyles />
            <Component {...pageProps} />
            <Footer />
          </BackgroundWrapper>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;

const BackgroundWrapper = styled.div`
  background-color: gray;
`;
const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
    font-size: 62.5%; 
}

color: white;
input {
    ::placeholder {
      color: #A6A6A6;
    }
  }


h1{
  font-weight: 700;
  font-size: 54px;
  line-height: 62px;
}
h2{
  font-weight: 400;
  font-size: 48px;
  line-height: 55px;
}
h3{
  font-weight: 400;
  font-size: 40px;
  line-height: 46px;
}
p{
  font-size: 1.5rem;
}

a {
    color: inherit;
    text-decoration: none;
}
* {
    box-sizing: border-box;
}
input, button {
  background-color: transparent;
  border: none;
  outline: none;
}
`;
