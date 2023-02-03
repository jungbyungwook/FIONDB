import React from 'react';
import styled from 'styled-components';

import { FionDbIcon } from 'src/components/common/SvgIcons/FionDbIcon';

const Footer = () => {
  return (
    <Footerwrapper>
      <FionDbIcon />
      <p>Data based on NEXON DEVELOPERS</p>
    </Footerwrapper>
  );
};

export default Footer;

const Footerwrapper = styled.div`
  background: rgba(6, 5, 5, 0.75);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  p {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
`;
