import { AxiosResponse } from 'axios';
import { api } from 'src/pages/api';

// 🔴 티어이미지의 디폴트값이 없기 때문에 아직 구현중

// const tierImageUrl = [
//   {
//     divisionId: 800,
//     divisionName: '슈퍼챔피언스',
//     divisionUrl:
//       'https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank0.png',
//   },
//   {
//     divisionId: 900,
//     divisionName: '챔피언스',
//   },
//   {
//     divisionId: 1000,
//     divisionName: '슈퍼챌린지',
//   },
//   {
//     divisionId: 1100,
//     divisionName: '챌린지1',
//   },
//   {
//     divisionId: 1200,
//     divisionName: '챌린지2',
//   },
//   {
//     divisionId: 1300,
//     divisionName: '챌린지3',
//   },
//   {
//     divisionId: 2000,
//     divisionName: '월드클래스1',
//   },
//   {
//     divisionId: 2100,
//     divisionName: '월드클래스2',
//   },
//   {
//     divisionId: 2200,
//     divisionName: '월드클래스3',
//   },
//   {
//     divisionId: 2300,
//     divisionName: '프로1',
//   },
//   {
//     divisionId: 2400,
//     divisionName: '프로2',
//   },
//   {
//     divisionId: 2500,
//     divisionName: '프로3',
//   },
//   {
//     divisionId: 2600,
//     divisionName: '세미프로1',
//   },
//   {
//     divisionId: 2700,
//     divisionName: '세미프로2',
//   },
//   {
//     divisionId: 2800,
//     divisionName: '세미프로3',
//   },
//   {
//     divisionId: 2900,
//     divisionName: '유망주1',
//   },
//   {
//     divisionId: 3000,
//     divisionName: '유망주2',
//   },
//   {
//     divisionId: 3100,
//     divisionName: '유망주3',
//   },
// ];

// divisionId를 넣으면 key
export const getTierImage = async (divisionId?: string) => {
  const data = await getDivision();
  return data;
};

const url = 'https://static.api.nexon.co.kr/fifaonline4/latest/division.json';

interface IDivisionResponse {
  divisionId: number;
  divisionName: string;
}

const getDivision = async () => {
  const response: AxiosResponse<IDivisionResponse> = await api.get(url);
  const { data } = response;

  return data;
};

// index순
// const urlData = {
//   tierImageUrl: `https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${7}.png`,
// };
