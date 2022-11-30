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
  width: 100%;
  background-color: gray;
  /* height: 100vh;
  background-image: url('/images/background.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover; */
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
  font-size: 3.2rem;
}
h2{
  font-size: 2.4rem;
}
h3{
  font-size: 1.9rem;
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
