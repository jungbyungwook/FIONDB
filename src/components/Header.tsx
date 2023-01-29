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
              <img
                style={{
                  width: '108.47px',
                  height: '20px',
                }}
                src="/images/logo/FION.DB.png"
                alt=""
              />
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
                    fontSize: '20px',
                    color: '#ABEE02',
                    lineHeight: '23px',
                    position: 'relative',
                  }}
                >
                  전적 검색
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      backgroundColor: '#abee02',
                      top: 46,
                    }}
                  />
                </a>
              </LinkWrapper>
            ) : (
              <a
                style={{
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#ABEE02',
                  lineHeight: '23px',
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
                    fontSize: '20px',
                    color: '#ABEE02',
                    lineHeight: '23px',
                    position: 'relative',
                  }}
                >
                  랭킹
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: 4,
                      backgroundColor: '#abee02',
                      top: 46,
                    }}
                  />
                </a>
              </LinkWrapper>
            ) : (
              <a
                style={{
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#ABEE02',
                  lineHeight: '23px',
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

  background-color: #212121;
  display: flex;

  align-items: center;

  ul {
    display: flex;
    list-style: none;
    color: white;
    color: #abee02;
    align-items: center;
  }
  li {
    /* float: left; */
  }
  li + li {
    margin-left: 48px;
  }
`;

const LinkWrapper = styled.div`
  /* padding-bottom: 4px;
  border-bottom: solid #abee02;
  border-width: 6px; */
`;
