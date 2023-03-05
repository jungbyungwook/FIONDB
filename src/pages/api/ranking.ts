import type { NextApiRequest, NextApiResponse } from 'next';
const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async (page: string) => {
  try {
    return await axios.get(
      `https://fifaonline4.nexon.com/datacenter/rank/2?n4pageno=${page}`,
    );
  } catch (error) {
    console.error(error);
  }
};

const ranking = async (page: string) => {
  const html: any = await getHtml(page);

  let ulList: any = [];
  const $: any = cheerio.load(html.data);
  const $bodyList: any = $('div.tr');
  $bodyList.each(function (i: number, elem: any) {
    ulList[i] = {
      rank_no: $(elem).find('span.td.rank_no').text(),
      nickname: $(elem)
        .find('span.td.rank_coach span.coach_wrap span.name.profile_pointer')
        .text(),
      club_value: $(elem).find('span.td.rank_coach span.price').text(),
      level: $(elem)
        .find('span.td.rank_coach span.coach_wrap span.lv span.txt')
        .text(),
      ranking_score: $(elem).find('span.td.rank_r_win_point').text(),
      record: $(elem).find('span.td.rank_before').text(),
      Odds: $(elem).find('span.td.rank_r_rate').text(),
      rank_best: $(elem)
        .find('span.td.rank_best span.ico_rank')
        .last()
        .find('img')
        .attr('src'),
    };
  });

  const data = ulList.filter((n: any) => n.rank_no);
  return { data, nextPage: Number(page) + 1 };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const page: any = req.query.page;
  const data = await ranking(page);
  res.status(200).json(data);
};

export default handler;
