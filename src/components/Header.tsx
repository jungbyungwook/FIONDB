import Image from 'next/image';
import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Header = () => {
  return (
    <HeaderWrapper>
      <ul>
        <li>
          <Link href="/">
            <a>
              <img src="/images/FION.DB.png" alt="" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>전적검색</a>
          </Link>
        </li>
        <li>
          <Link href="/ranking">
            <a>랭킹</a>
          </Link>
        </li>
      </ul>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  z-index: 1;
  position: fixed;
  width: 100%;

  img {
    width: 85px;
    height: 20px;
  }
  background-color: black;
  display: flex;
  ul {
    list-style: none;
    color: white;
    font-size: 20px;
  }
  li {
    float: left;
  }
  li + li {
    margin-left: 5rem;
  }
`;
