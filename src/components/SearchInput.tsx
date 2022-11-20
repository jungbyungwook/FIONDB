import Image from 'next/image';
import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
}

const SearchInput: FC<Props> = (props) => {
  const { text } = props;
  return (
    <SearchInputWrapper>
      <StyledInput placeholder={text} />
    </SearchInputWrapper>
  );
};

export default SearchInput;

const SearchInputWrapper = styled.div``;

const StyledInput = styled.input`
  background-color: white;
  width: 58.5rem;
  height: 6.8rem;
  padding-left: 2rem;
  border-radius: 1.5rem;
`;
