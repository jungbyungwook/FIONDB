import type { AppProps } from 'next/app';
import styled, { createGlobalStyle } from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

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
