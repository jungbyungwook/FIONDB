import { NextPage } from 'next';
import Link from 'next/link';
// import TestMatchResultBox from 'src/components/player/TestMatchResultBox';

// 해당 url로 들어오면 잘못된 url이다.
// 전적검색시 필요한 nickName을 입력하지 않은 상태이기 때문이다.

// 잘못된 접근이라는 것을 인지할 수 있는 문장과 메인페이지로 리다이렉트 할 수 있는 버튼을 제공

const PlayerPage: NextPage = () => {
  return (
    <div style={{ height: '400px', paddingTop: '100px' }}>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  );
};

export default PlayerPage;
