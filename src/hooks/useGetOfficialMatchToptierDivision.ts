import { MATCH_META_DATA } from 'src/constants/matchMeta';
import { useCaseGetMetaData } from 'src/useCases/useCaseGetMetaData';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';

export const useGetOfficialMatchToptierDivision = (nickName: string) => {
  const { useGetUserProfileQuery, useGetTopTierQuery } = useCaseUserProfile();
  const { useGetMatchDivisionMeta } = useCaseGetMetaData();
  const { data: userProfileData } = useGetUserProfileQuery(nickName);
  const { data: userTopTierData } = useGetTopTierQuery(
    userProfileData?.accessId || '',
  );

  const matchDivisionMetaQuery = useGetMatchDivisionMeta();

  const userOfficialMathToptiers = userTopTierData?.filter(
    ({ matchType }) => matchType === MATCH_META_DATA[2].matchtype,
  );

  const userOfficialMatchDivision = matchDivisionMetaQuery?.data?.data.filter(
    ({ divisionId }) => divisionId === userOfficialMathToptiers?.[0].division,
  )[0];

  return {
    userOfficialMatchDivision,
  };
};
