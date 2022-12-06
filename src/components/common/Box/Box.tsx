// import { ReactNode } from 'react';

import { ReactNode } from 'react';
import styled from 'styled-components';

// interface BoxProps {
//   children: ReactNode;
// }

// export const FormationBox = ({ children }: BoxProps) => {
//   return <div>{children}</div>;
// };

interface BoxProps {
  formations: number[];
  children: ReactNode;
}

// 무언가 relative를 기준으로  absolute속성을 통해 좌표를 정해줄 경우 사용할만한 BoxComponent
// formations라는 고유한 key 값을 배열로 받고 정해진 만큼만 그려준다.
// 내부적으로 children을 넣어주는데 그것들이 들어간다.

export const FormationBox = ({ formations, children }: BoxProps) => {
  return null;
};
//   return (
//     <S.BoxContainer>
//       {
//         formations.map((formation) => ({
//           children,
//         }))
//         // <S.PositionWrap key={formation}>{children}</S.PositionWrap>
//       }
//     </S.BoxContainer>
//   );
// };

// formations.map을 돌면서 번호에 따라서 키값으로 style 속성혹은 StyledComponent를 만들어놓고 가져와서 사용하자.
// const S = {
//   BoxContainer: styled.section`
//     /* position: relative; */
//   `,
//   PositionWrap: styled.section`
//     position: relative;
//     /* position: absolute; */
//   `,
// };
