import type { ReactNode } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import styled from 'styled-components';

import theme from 'src/style/theme';
import { getOffset, getWinPercent } from './util';

Chart.register(ArcElement);

interface Props {
  data: number[];
  cutout?: number;
  top?: ReactNode;
  bottom?: ReactNode;
  scale?: number;
}

export const OddsChart = (props: Props) => {
  const options = {
    cutout: props.cutout ? `${props.cutout}%` : '90%',
  };
  const odds = `${getWinPercent(props.data)}%`;

  return (
    <S.Layout>
      {props.top}
      <S.DoughnutContainer>
        <S.Absolute cutoutPercent={getOffset(options.cutout)}>
          {odds}
        </S.Absolute>
        <Doughnut
          options={options}
          data={{
            datasets: [
              {
                data: props.data,
                backgroundColor: [
                  theme.colors.green.fionGreen,
                  theme.colors.gray[600],
                  theme.colors.gray[600],
                ],
                borderWidth: 0,
              },
            ],
          }}
        />
      </S.DoughnutContainer>
      {props.bottom}
    </S.Layout>
  );
};

const S = {
  Layout: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    @media ${({ theme }) => theme.media.small} {
      font-size: ${({ theme }) => theme.fontSizes.content[12]};
    }
  `,
  DoughnutContainer: styled.div`
    position: relative;
    width: 15rem;
    height: 15rem;

    @media ${({ theme }) => theme.media.small} {
      width: 10rem;
      height: 10rem;
    }
  `,
  Absolute: styled.div<{ cutoutPercent: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    overflow: hidden;
    top: ${({ cutoutPercent }) => cutoutPercent};
    right: ${({ cutoutPercent }) => cutoutPercent};
    bottom: ${({ cutoutPercent }) => cutoutPercent};
    left: ${({ cutoutPercent }) => cutoutPercent};
    border-radius: 100%;
    font-size: ${({ theme }) => theme.fontSizes.subTitle[24]};

    @media ${({ theme }) => theme.media.small} {
      font-size: ${({ theme }) => theme.fontSizes.content[16]};
    }
  `,
};
