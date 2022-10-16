import { useGetUserAccessId } from 'hooks/useGetUserAccessId';
import useGetUserRecord from 'hooks/useGetUserRecord';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';

interface ButtonProps {
  style?: { [key: string]: string };
  text: string;
  handleClick: () => void;
}
// UI 만 담당하는 Component 트리거는 어떻게 붙여줘야하지?
// button은 UI 뿐만 아니라 기능도 함께 동작할 것이기 때문에 기능을 함께해줘도 되지 않을까?
// 한가지 일만 하는가? UI를 그려준다.

// UI만 그리고 trigger의 역활만 하는 button
const Button = ({ style, text, handleClick }: ButtonProps) => {
  return <ButtonInput type="button" value={text} onClick={handleClick} />;
};

const ButtonInput = styled.input`
  //layout
  width: 10rem;
  height: 3.5rem;
  border: 1px solid green;
  border-radius: 0.8rem;
  text-align: center;
  //paint
  cursor: pointer;
  background-color: green;
  color: white;
  //hover
  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
