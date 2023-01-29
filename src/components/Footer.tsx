import Image from 'next/image';
import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Footerwrapper>
      <img
        style={{
          width: '108.47px',
          height: '20px',
        }}
        src="/images/logo/FION.DB.png"
        alt=""
      />
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
  /* position: absolute; */
  /* bottom: 0; */
  /* left: 0; */
  p {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
`;
