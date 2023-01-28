import Head from 'next/head';

interface IHeadMetaProps {
  title?: string;
  description?: string;
  // url?: string;
  // image?: string;
}

const FION_DB_META = {
  TITLE: 'FionDB 피파온라인4 전적검색',
  DESCRIPTION: '넥슨 피파온라인4의 전적검색 기능을 제공하는 서비스입니다.',
  OG_TITLE: 'FionDB',
};

export const HeadMeta = ({
  title = FION_DB_META.TITLE, // 콘텐츠 제목
  description = FION_DB_META.DESCRIPTION,
}: // url,
// image,
IHeadMetaProps) => {
  return (
    <>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta property="og:title" content={FION_DB_META.OG_TITLE} />
      <meta property="og:type" content="website" />
      <meta property="og:article:author" content={FION_DB_META.TITLE} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* <meta property="og:url" content={url} /> */}
      {/* <meta property="og:image" content={image} /> */}
      {/* <meta name="robots" content="인덱스, 팔로우"/> */}
    </>
  );
};
