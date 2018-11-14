import * as React from 'react';
import styled from 'react-emotion';
import { left, right, top, width } from 'styled-system';
import HeavyBagImg from '../assets/images/heavy-bag.svg';
import { colors, gradients, spacing } from '../styles/theme';
import { isMobile } from '../utils/screensize';

const DIVIDER_LENGTH = '125px';
const DIVIDER_LENGTH_MOBILE = '50px';

const DividerBackground = styled('div')({
  background: gradients.divider,
  height: 18,
  position: 'relative',
  width: '100%',
});

const DividerSection = styled('div')(
  {
    background: colors.background,
    height: 6,
    position: 'absolute',
    top: 6,
    width: isMobile() ? DIVIDER_LENGTH_MOBILE : DIVIDER_LENGTH,
  },
  top,
  left,
  right,
  width,
);

const HeavyBag = styled('img')(
  {
    position: 'absolute',
    top: 2,
    width: spacing.xxxxxl,
  },
  left,
  right,
);

const Divider = ({
  white,
  showHeavyBags,
}: {
  showHeavyBags?: boolean;
  white?: boolean;
}) => {
  const getXPos = (pos: string) =>
    `calc(${pos} - ${isMobile() ? DIVIDER_LENGTH_MOBILE : DIVIDER_LENGTH}/2)`;
  return (
    <DividerBackground>
      <DividerSection left={0} width="5%" />
      <DividerSection right={0} width="5%" />
      {white && <DividerSection left={getXPos('20%')} />}
      {white && <DividerSection left={getXPos('50%')} />}
      {white && <DividerSection right={getXPos('20%')} />}
      {showHeavyBags && !isMobile() && <HeavyBag left="5%" src={HeavyBagImg} />}
      {showHeavyBags && !isMobile() && (
        <HeavyBag right="5%" src={HeavyBagImg} />
      )}
    </DividerBackground>
  );
};

export default Divider;
