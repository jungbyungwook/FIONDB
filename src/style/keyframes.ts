import { keyframes } from 'styled-components';

export const renderDownIntoUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 30%, 0);
  }
  100% {
    opacity: 1;
    transform: translateZ(0)
  }
`;

export const renderUpIntoDown = keyframes`
  0% {
    opacity: 0.7;
    transform: translate3d(0, -2%, 0);
  }
  100% {
    opacity: 1;
    transform: translateZ(0)
  }
`;
