import { useCaseMatchSearch } from 'src/useCases/useCaseMatchSearch';

export const SoccerPlayerName = ({ spId }: { spId: number }) => {
  const { useSoccerPlayerName } = useCaseMatchSearch();
  const name = useSoccerPlayerName(spId);

  const lastName = name?.result.split(' ')[1] || name?.result.split(' ')[0];
  return <span>{lastName}</span>;
};
