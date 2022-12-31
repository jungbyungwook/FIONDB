import axios from 'axios';

export const rankingApi = async () => {
  return await axios.get('http://localhost:3001');
};

export default async function handler(req, res) {
  const test = await rankingApi();
  // console.log(test.data);
  res.status(200).json(test.data);
}
