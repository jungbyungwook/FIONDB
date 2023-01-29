import { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  top?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
}

export const Input = ({ top, left, right, bottom, ...props }: Props) => {
  return (
    <StyleContainer>
      <div>{top}</div>
      <StyleFlexWrap>
        {left}
        <StyleInput {...props} />
        {right}
      </StyleFlexWrap>
      <div>{bottom}</div>
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  border: 1px solid green;
  width: 100%;
  height: 100%;
`;

const StyleFlexWrap = styled.span`
  display: felx;
  height: 100%;
  width: 100%;
`;

const StyleInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: white;
`;
