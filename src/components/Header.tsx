import Image from 'next/image';
import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
interface Props {
  logo : string;
  pageList : string[];
}

const test :string = "kfjek";


const Header = ({logo,pageList} : Props) => {
  // const { text } = props;
  return <HeaderWrapper>
    {/* <div>{logo}</div> */}
    {/* <div>{pageList}</div> */}
    
    <ul>
      <li><img src="/images/FION.DB.png" alt="" /></li>
      <li>전적검색</li>
      <li>랭킹</li>
    </ul>
  </HeaderWrapper>;
};

export default Header;

const HeaderWrapper = styled.div`
  /* color: white; */
  /* z-index: 1; */
  img{
    width:85px;
    height:20px;
  }
  background-color: black;
  display: flex;
  ul{
    list-style:none;
    color: white;
    font-size:20px
  }
  li{
    float: left;
  }
  li + li {
  margin-left:5rem;
  }
  
`;
