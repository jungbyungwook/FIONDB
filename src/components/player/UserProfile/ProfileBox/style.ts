import styled from 'styled-components';
export const Section = styled.section`
  display: flex;
  width: 100%;
  gap: 2rem;
  padding: 3rem;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #31313c;
`;

export const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
  width: 60rem;

  gap: 2rem;
`;

export const ImageWrap = styled.div`
  position: relative;
  overflow: auto;
`;

export const BackgroundImageWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const UserProfileDataWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  gap: 1rem;
  text-align: left;
`;

export const NickName = styled.h4`
  margin: 0;
`;

export const Level = styled.div`
  font-size: 1.5rem;
`;

export const RefetchButton = styled.div`
  margin-top: 1rem;
`;
