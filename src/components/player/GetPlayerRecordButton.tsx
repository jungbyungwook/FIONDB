import { Button } from '@components';
import { useGetUserAccessId } from 'hooks/useGetUserAccessId';
import useGetUserRecord from 'hooks/useGetUserRecord';
import { useRecoilValue } from 'recoil';
import userProfileState from 'state/userProfile';

// 어떤 데이터를 다룰 것인가?
// userMatchRecord(유저의 매치 기록)
// 특정 함수를 Button UI Component에게 할당해주고 스타일을 적용시키는 Component
const RefetchPlayerRecordButton = () => {
  const { nickName, accessId } = useRecoilValue(userProfileState);
  const {
    data: userBaseProfile,
    isLoading,
    refetch,
  } = useGetUserAccessId(nickName);
  const { userMatchQuery, userTopTierQuery } = useGetUserRecord(accessId);

  const handleClick = () => {
    // 나중에 생각하자.
  };

  return <Button text={'전적갱신'} handleClick={handleClick} />;
};

export default RefetchPlayerRecordButton;
