import * as React from 'react';
import StarImg from '../assets/images/star';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { ASSETS_PATH } from '../utils/constants';
import { isMobile } from '../utils/screensize';
import Divider from './Divider';
import { LinkPrimary } from './Form/Button';
import GalleryImage from './GalleryImage';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const Mission = () => (
  <div>
    <t.Title center pb={spacing.ml}>
      <l.FlexCentered>
        <l.Space mr={spacing.ml}>
          <StarImg
            color={colors.red}
            side={[spacing.xxl, spacing.xxl, spacing.xxxxl]}
          />
        </l.Space>
        Mission
      </l.FlexCentered>
    </t.Title>
    <Divider white />
    <l.Page
      px={[spacing.sm, 0]}
      py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
      <l.Flex alignTop>
        <l.Space
          ml="auto"
          mr={[0, spacing.xxxl]}
          width={['100%', '90%', '70%']}>
          <t.H1 mb={[spacing.ml, spacing.ml]}>RFC Mission:</t.H1>
          <t.Text large mb={[spacing.xxxl, spacing.xxxl]}>
            Our mission at React Fitness Club is to guide our members to a
            healthy lifestyle by cultivating{' '}
            <l.Span bold>positive mental & physical habits</l.Span>. Each of our
            martial arts and fitness programs serves as a tool to help along
            that journey - possible paths to a common goal. By providing a{' '}
            <l.Span bold>diverse set of programs</l.Span>, we offer something
            for everyone - for all ages, experience levels, and personal
            backgrounds.
          </t.Text>
          <t.Text large mb={[spacing.xxxl, spacing.xxxl]}>
            At RFC we embrace the fact that{' '}
            <l.Span bold>living a healthy lifestyle</l.Span> is a continuous
            process at any age - there is no one and done mentality. You can’t
            just go to the gym for a few months and expect to stay fit after you
            stop going to the gym. Living a healthy lifestyle is an{' '}
            <l.Span bold>ongoing practice</l.Span>, so it’s important to{' '}
            <l.Span bold>feel welcome and included</l.Span> at your training
            place of choice. Having a{' '}
            <l.Span bold>robust support network</l.Span> is essential for
            feeling connected to your community, as well as having the
            confidence to act independently, knowing that you have people you
            trust to fall back on when needed.
          </t.Text>
          {isMobile() && (
            <l.FlexCentered
              mb={[spacing.xxxl, spacing.xxxxxl]}
              mx="auto"
              width={['85%', '65%']}>
              <GalleryImage
                image={{
                  caption: 'REaCT circle to close out class.',
                  src: `${ASSETS_PATH}/programs/REaCT/react-class-circle.png`,
                  thumbnail: `${ASSETS_PATH}/programs/REaCT/react-class-circle.png`,
                  thumbnailHeight: 150,
                  thumbnailWidth: 120,
                }}
              />
            </l.FlexCentered>
          )}
          <t.H1 mb={[spacing.ml, spacing.ml]}>Team-Based Training</t.H1>
          <t.Text large mb={[spacing.xxxl, spacing.xxxl]}>
            At RFC there is always "someone in your corner", rooting for you,
            supporting your{' '}
            <l.Span bold>personal and professional goals</l.Span>, and guiding
            you on your mission to live a healthy life.
          </t.Text>
          <t.Text large mb={[spacing.xxxl, spacing.xxxl]}>
            No one gets there alone. RFC is a community of like-minded, fitness
            oriented humans who are there to support you with your physical and
            mental training. We encourage friendly competition!
          </t.Text>
          <t.H1 mb={[spacing.ml, spacing.ml]}>Peace & Love</t.H1>
          <t.Text large mb={[spacing.xxxl, spacing.xxxl]}>
            RFC has a zero tolerance policy for prejudice and intolerance of all
            forms.{' '}
            <l.Span bold>
              ALL humans will find a safe space at our club, no matter what.
            </l.Span>{' '}
            We take this policy very seriously, and will not hesitate to take
            action when necessary regarding instances of intolerance or
            bullying.
          </t.Text>
          {isMobile() && (
            <l.FlexCentered
              mb={[spacing.xxxl, spacing.xxxxxl]}
              mx="auto"
              width={['85%', '65%']}>
              <GalleryImage
                image={{
                  caption:
                    'Great hike in the White Mountains during summer training.',
                  src: `${ASSETS_PATH}/programs/Outdoor/white-mtns-group.png`,
                  thumbnail: `${ASSETS_PATH}/programs/Outdoor/white-mtns-group.png`,
                  thumbnailHeight: 150,
                  thumbnailWidth: 120,
                }}
              />
            </l.FlexCentered>
          )}
        </l.Space>
        {!isMobile() && (
          <l.FlexColumn width="35%">
            <GalleryImage
              image={{
                caption: 'REaCT circle to close out class.',
                src: `${ASSETS_PATH}/programs/REaCT/react-class-circle.png`,
                thumbnail: `${ASSETS_PATH}/programs/REaCT/react-class-circle.png`,
                thumbnailHeight: 150,
                thumbnailWidth: 120,
              }}
            />
            <l.Space height={spacing.xl} />
            <GalleryImage
              image={{
                caption:
                  'Great hike in the White Mountains during summer training.',
                src: `${ASSETS_PATH}/programs/Outdoor/white-mtns-group.png`,
                thumbnail: `${ASSETS_PATH}/programs/Outdoor/white-mtns-group.png`,
                thumbnailHeight: 150,
                thumbnailWidth: 120,
              }}
            />
            <l.Space height={spacing.ml} />
          </l.FlexColumn>
        )}
      </l.Flex>
      <l.FlexCentered
        columnOnMobile
        mb={100}
        mt={[0, spacing.xxl]}
        mx="auto"
        spaceBetween
        width="100%">
        <LinkPrimary to="/programs" width={['100%', 281]}>
          Check out our programs
        </LinkPrimary>
        <l.Space
          height={[spacing.xl, 0]}
          width={[0, spacing.xxl, spacing.xxxxxl]}
        />
        <LinkPrimary to="/gallery" width={['100%', 281]}>
          View our gallery
        </LinkPrimary>
      </l.FlexCentered>
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Mission);
