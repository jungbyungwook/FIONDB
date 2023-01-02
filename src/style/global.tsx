import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-size: 62.5%; 
}
@font-face {
  font-family: 'NEXON Lv1 Gothic OTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
/* color: white; */
input {
    color: ${({ theme }) => theme.colors.gray[900]};
    ::placeholder {
      color: #A6A6A6;
    }
  }

h1{
  font-size: ${({ theme }) => theme.fontSizes.title[1]}
  /* font-size: 3.2rem; */
}
h2 {
  font-size: ${({ theme }) => theme.fontSizes.title[2]};
  /* font-size: 2.4rem; */
}
h3 {
  font-size: ${({ theme }) => theme.fontSizes.title[3]};
  /* font-size: 1.9rem; */
}
h4 {
  font-size: ${({ theme }) => theme.fontSizes.title[4]};
}
h5 {
  font-size: ${({ theme }) => theme.fontSizes.title[5]};
}
p{
  /* font-size: 1.5rem; */
}
a {
    color: inherit;
    text-decoration: none;
}
* {
    box-sizing: border-box;
    font-family: NEXON Lv1 Gothic OTF;
    color: ${({ theme }) => theme.colors.gray[100]};
    font-size: ${({ theme }) => theme.fontSizes.content.small};
}
input, button {
  background-color: transparent;
  border: none;
  outline: none;
}
`;
