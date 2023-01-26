import { useSoccerPlayerName } from 'src/hooks/query/useSoccerPlayerName';

export const SoccerPlayerName = ({ spId }: { spId: number }) => {
  const name = useSoccerPlayerName(spId);

  const lastName = name?.result.split(' ')[1] || name?.result.split(' ')[0];
  return <span>{lastName}</span>;
};
