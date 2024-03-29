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
  title,
  description = FION_DB_META.DESCRIPTION,
}: // url,
// image,
IHeadMetaProps) => {
  return (
    <Head>
      <title>
        {title ? `${title} - ${FION_DB_META.TITLE}` : FION_DB_META.TITLE}
      </title>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:article:author" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:url" content={url} /> */}
      {/* <meta property="og:image" content={image} /> */}
      {/* <meta name="robots" content="인덱스, 팔로우"/> */}
    </Head>
  );
};
