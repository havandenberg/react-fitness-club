import * as React from 'react';
import styled from 'react-emotion';
import CheckImg from '../../assets/images/check.svg';
import ContactImg from '../../assets/images/contact';
import QuestionMarkImg from '../../assets/images/question-mark.svg';
import l from '../../styles/layout';
import {
  borders,
  colors,
  fontSizes,
  mobileSizes,
  spacing,
  transitions,
} from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/member';
import { isMobile } from '../../utils/screensize';
import { ButtonPrimary } from '../Form/Button';

const BookButton = styled(l.Space)({
  ':hover': {
    background: '#4ba6d4',
  },
  background: '#2996cc',
  border: 'none',
  borderRadius: 3,
  color: colors.white,
  cursor: 'pointer',
  font: '700 11px system-ui',
  padding: `${spacing.sm} 2em`,
  transition: transitions.default,
});

interface Props {
  member: Member;
  setView: (view: string) => void;
}

const Welcome = ({ setView }: Props) => (
  <l.FlexColumn>
    <l.FlexCentered mb={[spacing.ml, spacing.xl]}>
      <l.Img height={[spacing.xl, spacing.xxxl]} src={CheckImg} />
      <l.Space width={spacing.ml} />
      <t.Text
        center={isMobile()}
        fontSize={[mobileSizes.h3, fontSizes.h3]}
        italic>
        Account setup complete!
      </t.Text>
    </l.FlexCentered>
    <t.Text center mb={spacing.ml} mx="auto" width={['100%', '70%']}>
      <l.Blue>You may now proceed with your free intro class!</l.Blue>
    </t.Text>
    <t.Text center mb={spacing.ml} mx="auto" width={['100%', '70%']}>
      Feel free to come to any{' '}
      <t.Link border={borders.red} color={colors.red} to="/schedule">
        regularly scheduled
      </t.Link>{' '}
      program.
    </t.Text>
    <t.Text center mx="auto" width={['100%', '70%']}>
      Our{' '}
      <t.Link
        border={borders.red}
        color={colors.red}
        to="/programs?id=react-mma">
        REaCT MMA
      </t.Link>{' '}
      and{' '}
      <t.Link
        border={borders.red}
        color={colors.red}
        to="/programs?id=react-skillz">
        REaCT Skillz
      </t.Link>{' '}
      programs also offer private individual and group lessons.
    </t.Text>
    <l.Flex
      columnOnMobile
      mb={[spacing.ml, spacing.xxxl]}
      mt={[spacing.ml, spacing.xl]}
      spaceBetween>
      <t.Text>Book an intro online here:</t.Text>
      <l.Space height={spacing.ml} width={spacing.xxxl} />
      <t.Anchor
        href={process.env.REACT_APP_SQUARE_BOOK_NOW_URI}
        target="_blank">
        <BookButton>BOOK NOW</BookButton>
      </t.Anchor>
    </l.Flex>
    <l.FlexColumn width={['100%', '60%']}>
      <t.Text large mb={spacing.ml}>
        Next Steps
      </t.Text>
      <t.Text center mb={spacing.ml}>
        After you have tried out a program or two (or three 😉),
        <l.Break />
        return here to:
      </t.Text>
      <ButtonPrimary
        display="inline-block"
        onClick={() => setView('membership')}
        size="small">
        Choose a membership
      </ButtonPrimary>
      <t.Text mb={spacing.ml} mt={spacing.xl}>
        You can now also:
      </t.Text>
      <ButtonPrimary
        display="inline-block"
        onClick={() => setView('profile')}
        size="small">
        Edit your profile
      </ButtonPrimary>
      <t.Text large mb={spacing.ml} mt={spacing.xxxl}>
        Any questions?
      </t.Text>
      <t.Text>
        Check out our{' '}
        <t.Link border={borders.red} color={colors.red} to="/faqs">
          FAQs
          <l.Img height={spacing.ml} src={QuestionMarkImg} />
        </t.Link>{' '}
        or{' '}
        <t.Link border={borders.red} color={colors.red} to="/contact">
          contact us <ContactImg side={spacing.ml} />
        </t.Link>{' '}
        directly!
      </t.Text>
    </l.FlexColumn>
  </l.FlexColumn>
);

export default Welcome;
