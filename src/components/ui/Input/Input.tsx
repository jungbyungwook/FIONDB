import { InputHTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  top?: ReactNode;
  left?: ReactNode;
  bottom?: ReactNode;
  right?: ReactNode;
  isFocus?: boolean;
}

export const Input = ({
  top,
  left,
  bottom,
  right,
  type,
  value,
  isFocus = false,
  onChange,

  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(isFocus);
    if (!isFocus || !inputRef.current) return;
    inputRef.current.focus();
  }, []);

  /*
  Next.js에서는 개발환경에서 tag에 직접적으로 autofocus를 지정해줄 경우 확인할 수 없다.
  yarn build && yarn start 후에는 제대로 동작한다. 그러나 매번 yarn build && yarn start 할 기에는..
  useRef && useEffect를 이용하여 current.focus() 해주는 방식으로 구현

  https://github.com/vercel/next.js/discussions/17213#discussioncomment-591492
  */
  return (
    <StyleFlexContainer>
      {top}
      <StyleInputWrap>
        {left}
        <StyleInput
          ref={inputRef}
          value={value}
          onChange={onChange}
          {...props}
        />
        {right}
      </StyleInputWrap>
      {bottom}
    </StyleFlexContainer>
  );
};

const StyleFlexContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const StyleInputWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyleInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 10px;
  border: 3px solid #fff;
  background-color: #fff;
  outline: none;

  &:focus {
    border: 3px solid #a7f600;
  }
`;
