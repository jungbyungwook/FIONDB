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
    <StyleLayout>
      {props.top}
      <DoughnutContainer>
        <Absolute cutoutPercent={getOffset(options.cutout)}>{odds}</Absolute>
        <Doughnut
          options={options}
          data={{
            // labels:,
            datasets: [
              {
                // label: '',
                data: props.data,
                backgroundColor: [
                  theme.colors.green.fionGreen,
                  theme.colors.gray[600], // 무승부는 보여줄것인가?
                  theme.colors.gray[600],
                ],
                borderWidth: 0,
              },
            ],
          }}
        />
      </DoughnutContainer>
      {props.bottom}
    </StyleLayout>
  );
};

const StyleLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
`;

const DoughnutContainer = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
`;

const Absolute = styled.div<{ cutoutPercent: string }>`
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
`;
