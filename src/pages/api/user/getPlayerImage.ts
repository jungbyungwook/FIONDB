import { cdnInstance } from 'src/pages/api/instance';
// import { apiInstance } from 'src/pages/api/instance';
const getPlayerImage = async (spid: number): Promise<any> => {
  const additionalUrl = `live/externalAssets/common/playersAction/p${spid}.png`;
  const { data } = await cdnInstance(additionalUrl);

  return data;
};

export default getPlayerImage;
