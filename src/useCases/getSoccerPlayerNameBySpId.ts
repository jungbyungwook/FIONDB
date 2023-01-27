import { IMetaSpId } from 'src/pages/api/player/type';
import { binarySearch } from 'src/util/search';

export const getSoccerPlayerNameBySpId = (spId: number, data: IMetaSpId[]) => {
  if (!data) return;
  if (spId === 0) return { result: '몰수패선수', count: 0 };
  return binarySearch(data, spId, 0, data.length);
};
