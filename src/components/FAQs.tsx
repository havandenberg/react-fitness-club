import * as React from 'react';
import styled from 'react-emotion';
import BulletImg from '../assets/images/bullet.svg';
import ContactImg from '../assets/images/contact';
import QuestionMarkImg from '../assets/images/question-mark.svg';
import l from '../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  mobileSizes,
  spacing,
  tabletSizes,
} from '../styles/theme';
import t from '../styles/typography';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const ListItem = ({ text }: { text: string }) => (
  <l.Flex mb={spacing.sm} ml={spacing.xxl}>
    <l.Img height={spacing.ml} src={BulletImg} />
    <l.Space width={spacing.ml} />
    <t.Text>{text}</t.Text>
  </l.Flex>
);

const Answer = styled(t.Text)({
  marginBottom: spacing.xxxl,
  marginLeft: spacing.xl,
  maxWidth: 750,
});

const Question = styled(t.H1)({
  color: colors.darkBlue,
  fontSize: fontSizes.h3,
  marginBottom: spacing.sm,
  maxWidth: 750,
  textShadow: 'none',
  [breakpoints.tablet]: {
    fontSize: tabletSizes.h3,
  },
  [breakpoints.mobile]: {
    fontSize: mobileSizes.h3,
  },
});

const FAQs = () => (
  <div>
    <t.Title center pb={spacing.ml}>
      <l.FlexCentered>
        <l.Space mr={spacing.ml}>
          <l.Img
            height={[spacing.xxl, spacing.xxl, spacing.xxxxl]}
            width={[spacing.xxl, spacing.xxl, spacing.xxxxl]}
            src={QuestionMarkImg}
          />
        </l.Space>
        FAQs
      </l.FlexCentered>
    </t.Title>
    <Divider white />
    <l.Page
      px={[spacing.sm, 0]}
      py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
      <Question>What should I bring to class?</Question>
      <Answer>
        <ListItem text="Shorts" />
        <ListItem text="T-shirt" />
        <ListItem text="Water bottle" />
        <ListItem text="Athletic cup (recommended)" />
        <t.Text>
          Basics are available for purchase through our{' '}
          <t.Link border={borders.red} color={colors.red} to="/shop">
            pro shop
          </t.Link>
          .
        </t.Text>
      </Answer>
      <Question>I have no martial arts experience, is that ok?</Question>
      <Answer>
        Absolutely! There are no requirements to start and we welcome anyone
        regardless of experience!
      </Answer>
      <Question>How many classes per week are recommended?</Question>
      <Answer>
        We recommend students attend two classes per week. Adults with busy
        schedules can make progress with one class a week as well, although at a
        slower pace.
      </Answer>
      <Question>Is there parking?</Question>
      <Answer>
        Yes there is parking near the door and along the street if needed.
      </Answer>
      <Question>I'm a parent. Can I watch my child take a class?</Question>
      <Answer>
        Yes, we have seating both inside and outside the training rooms
        available.
      </Answer>
      <Question>
        What is the difference between the multi-pass vs. a single program
        memberships?
      </Question>
      <Answer>
        A single program gives you access to only that particular style. The
        multi-pass gives you unlimited access to everything RFC has to offer!
      </Answer>
      <Question>What are some social activities hosted by RFC?</Question>
      <Answer>
        We love that our members like to hangout outside of classes and we try
        to offer activities such as cookouts, movie night trips, park games, & a
        wide assortment of tabletop, board, and card games. Keep an eye on the{' '}
        <t.Link border={borders.red} color={colors.red} to="/events">
          events
        </t.Link>{' '}
        page for the next one!
      </Answer>
      <Question>
        I'm uncomfortable being in large groups, will this be a problem?
      </Question>
      <Answer>
        Not at all! We offer private group and individual lessons! We can also
        work with you to meet your needs in a class!
      </Answer>
      <Question>What is your allergy policy?</Question>
      <Answer>
        We ask that all members please disclose any allergies we have so that we
        can continue to be aware of any needs that may arise. Talk to us!
      </Answer>
      <Question>Am I going to get beat up in class?</Question>
      <Answer>
        Absolutely not. We promote a safe environment and we will not tolerate
        bullying or hazing of any kind.
      </Answer>
      <Question>What are the chances of injury?</Question>
      <Answer>
        As with any physical sport there is a chance of injury. However, we take
        active steps to ensure as safe of an environment as possible to minimize
        the risk.
      </Answer>
      <l.FlexColumn>
        <t.Text large mb={spacing.ml}>
          Any other questions?
        </t.Text>
        <t.Text>
          <t.Link border={borders.red} color={colors.red} to="/contact">
            Contact us <ContactImg side={spacing.ml} />
          </t.Link>{' '}
          directly!
        </t.Text>
      </l.FlexColumn>
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(FAQs);
