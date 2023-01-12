import Image from 'next/image';
import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

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
            {router.route === '/' ? (
              <LinkWrapper>
                <a
                  style={{
                    fontWeight: 400,
                    fontSize: '32px',
                    lineHeight: '37px',
                  }}
                >
                  전적 검색
                </a>
              </LinkWrapper>
            ) : (
              <a
                style={{
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: '37px',
                }}
              >
                전적 검색
              </a>
            )}
          </Link>
        </li>
        <li>
          <Link href="/ranking">
            {router.route === '/ranking' ? (
              <LinkWrapper>
                <a
                  style={{
                    fontWeight: 400,
                    fontSize: '32px',
                    lineHeight: '37px',
                  }}
                >
                  랭킹
                </a>
              </LinkWrapper>
            ) : (
              <a
                style={{
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: '37px',
                }}
              >
                랭킹
              </a>
            )}
          </Link>
        </li>
      </ul>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  z-index: 9000;
  position: fixed;
  width: 100%;
  height: 80px;

  img {
    width: 85px;
    height: 20px;
  }
  background-color: #212121;
  display: flex;

  ul {
    display: flex;
    list-style: none;
    color: white;
    font-weight: 400;
    font-size: 32px;
    /* line-height: 37px; */
    color: #abee02;
  }
  li {
    /* float: left; */
  }
  li + li {
    margin-left: 48px;
  }
`;

const LinkWrapper = styled.div`
  padding-bottom: 4px;
  border-bottom: solid #abee02;
  border-width: 6px;
`;
