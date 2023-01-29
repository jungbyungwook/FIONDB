import Image from 'next/image';
import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
}

const Title: FC<Props> = (props) => {
  const { text } = props;
  return <TitleWrapper>{text}</TitleWrapper>;
};

// export default Title;

const TitleWrapper = styled.h1``;
