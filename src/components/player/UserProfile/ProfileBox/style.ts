import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  width: 100%;
  gap: 2rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #31313c;
`;

export const UserProfileBox = styled.div`
  display: flex;
  /* align-items: flex-end; */
  align-items: center;
  height: 100%;
  gap: 1rem;
`;
export const ImageWrap = styled.div``;

export const UserProfileDataWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NickName = styled.div`
  font-size: 3rem;
`;

export const Level = styled.div`
  font-size: 1.5rem;
`;

export const RefetchButton = styled.div`
  margin-top: 1rem;
`;
