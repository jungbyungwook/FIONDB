import axios from 'axios';
import { NextPage } from 'next';
import { useInfiniteQuery } from 'react-query';

export const useRakingListQuery = () => {
  return useInfiniteQuery(
    ['RANKINGLIST'],
    async ({ pageParam = 1 }) => {
      // dev : `http://localhost:3000/api/ranking?page=${pageParam}`,
      const result = await axios.get(
        `https://fion-db.vercel.app/api/ranking?page=${pageParam}`,
      );
      return result;
    },
    {
      select: (data: any) => {
        const items = data.pages.map((page: any) => page.data).flat();

        return items;
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data.nextPage;
      },
    },
  );
};
