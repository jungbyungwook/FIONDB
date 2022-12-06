import { useSoccerPlayerName } from 'src/hooks/query/useSoccerPlayerName';
export const SoccerPlayerName = ({ spId }: { spId: number }) => {
  const name = useSoccerPlayerName(spId);
  return <span>{name?.result}</span>;
};
