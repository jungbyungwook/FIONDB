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
              <Logo src="/images/logo/FION.DB.png" alt="" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            {router.route === '/' ? (
              <LinkWrapper>
                <RecordSearchA
                  style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    color: '#ABEE02',
                    lineHeight: '23px',
                    position: 'relative',
                  }}
                >
                  전적 검색
                  <CurrentPositionBar
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      backgroundColor: '#abee02',
                      top: 32,
                    }}
                  />
                </RecordSearchA>
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
                      top: 32,
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
  height: 50px;

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
    margin-left: 32px;
  }
`;

const LinkWrapper = styled.div`
  /* padding-bottom: 4px;
  border-bottom: solid #abee02;
  border-width: 6px; */
`;

const Logo = styled.img`
  width: 108.47px;
  height: 20px;
  margin-right: 68px;

  @media (max-width: 1023px) {
    /* height: 100px; */
    width: 86.78;
    height: 16;
    /* margin-right: 26px; */
  }
`;

const RecordSearchA = styled.a`
  font-weight: 400;
  font-size: 20px;
  color: '#ABEE02';
  line-height: 23px;
  position: 'relative';
`;

const CurrentPositionBar = styled.div`
  position: 'absolute';
  width: '100%';
  height: 4px;
  background-color: '#abee02';
  top: 32;
`;
