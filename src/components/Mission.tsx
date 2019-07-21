import * as React from 'react';
import GalleryImg from '../assets/images/gallery';
import ProgramsImg from '../assets/images/programs';
import QuestionMarkWhiteImg from '../assets/images/question-mark-white.svg';
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
          <t.H1 mb={[spacing.ml, spacing.ml]}>RFC Mission</t.H1>
          <t.Text large mb={[spacing.xl]}>
            Our mission at React Fitness Club is to guide our members to a
            healthy lifestyle by cultivating{' '}
            <l.Blue>positive mental & physical habits</l.Blue>.
          </t.Text>
          <t.Text large mb={[spacing.xl]}>
            Each of our martial arts and fitness programs serves as a tool to
            help along that journey - possible paths to a common goal. By
            providing a <l.Blue>diverse set of programs</l.Blue>, we offer
            something for everyone - for all ages, experience levels, and
            personal backgrounds.
          </t.Text>
          {isMobile() && (
            <l.FlexCentered mb={spacing.xxxl} mx="auto" width="85%">
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
          <t.Text large mb={[spacing.xl]}>
            At RFC we embrace the fact that{' '}
            <l.Blue>living a healthy lifestyle</l.Blue> is a continuous process
            at any age - there is no "one & done" mentality. You can’t just go
            to the gym for a few months and expect to stay fit after you stop
            going.
          </t.Text>
          <t.Text large mb={[spacing.xxxl]}>
            Living a healthy lifestyle is an <l.Blue>ongoing practice</l.Blue>,
            so it’s important to feel <l.Blue>welcome and included</l.Blue> at
            your training center of choice. Having a{' '}
            <l.Blue>robust support network</l.Blue> is essential for feeling
            connected to your community, as well as the confidence to act
            independently.
          </t.Text>
          {isMobile() && (
            <l.FlexCentered mb={spacing.xxxl} mx="auto" width="85%">
              <GalleryImage
                image={{
                  caption: 'All geared up and ready to go!',
                  src: `${ASSETS_PATH}/featured/photos/im-ready-1.png`,
                  thumbnail: `${ASSETS_PATH}/featured/photos/im-ready-1.png`,
                  thumbnailHeight: 150,
                  thumbnailWidth: 120,
                }}
              />
            </l.FlexCentered>
          )}
          <t.H1 mb={[spacing.ml, spacing.ml]}>Team-Based Fitness</t.H1>
          <t.Text large mb={[spacing.xl]}>
            At RFC there is always "someone in your corner", supporting your{' '}
            <l.Blue>personal, professional, and physical fitness goals</l.Blue>{' '}
            and providing guidance to achieve your mission to live a healthy
            life.
          </t.Text>
          <t.Text large mb={[spacing.xl]}>
            Remember, <l.Blue>no one gets there alone!</l.Blue>
          </t.Text>
          {isMobile() && (
            <l.FlexCentered mb={spacing.xl} mx="auto" width="85%">
              <GalleryImage
                image={{
                  caption: 'On the warm up mats at NAGA Providence',
                  src: `${ASSETS_PATH}/featured/photos/naga-stretch-1.png`,
                  thumbnail: `${ASSETS_PATH}/featured/photos/naga-stretch-1.png`,
                  thumbnailHeight: 150,
                  thumbnailWidth: 120,
                }}
              />
            </l.FlexCentered>
          )}
          <t.Text large mb={[spacing.xxxl]}>
            RFC is a community of like-minded, fitness oriented humans who are
            there to support you throughout your training. We encourage friendly
            competition!
          </t.Text>
          <t.H1 mb={[spacing.ml, spacing.ml]}>Peace & Love</t.H1>
          <t.Text large mb={[spacing.xl]}>
            RFC has a <l.Blue>zero tolerance policy</l.Blue> for prejudice and
            intolerance of all forms.
          </t.Text>
          <t.Text large mb={[spacing.xl]}>
            <l.Blue>
              ALL humans will find a safe space at React Fitness Club, no matter
              what.
            </l.Blue>
          </t.Text>
          <t.Text large mb={[spacing.xl]}>
            We take this policy very seriously, and will not hesitate to take
            action when necessary regarding instances of bullying or
            intolerance.
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
            <l.Space height={spacing.xl} />
            <GalleryImage
              image={{
                caption: 'All geared up and ready to go!',
                src: `${ASSETS_PATH}/featured/photos/im-ready-1.png`,
                thumbnail: `${ASSETS_PATH}/featured/photos/im-ready-1.png`,
                thumbnailHeight: 150,
                thumbnailWidth: 120,
              }}
            />
            <l.Space height={spacing.xl} />
            <GalleryImage
              image={{
                caption: 'Pad holding for all ages at the 2019 Summer Luau',
                src: `${ASSETS_PATH}/featured/photos/skillz-1.png`,
                thumbnail: `${ASSETS_PATH}/featured/photos/skillz-1.png`,
                thumbnailHeight: 150,
                thumbnailWidth: 120,
              }}
            />
            <l.Space height={spacing.xl} />
            <GalleryImage
              image={{
                caption: 'On the warm up mats at NAGA Providence',
                src: `${ASSETS_PATH}/featured/photos/naga-stretch-1.png`,
                thumbnail: `${ASSETS_PATH}/featured/photos/naga-stretch-1.png`,
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
        <LinkPrimary to="/programs" width={['100%', 'auto']}>
          <ProgramsImg color={colors.white} side={spacing.xl} />
          &nbsp;&nbsp;&nbsp; Browse our programs
        </LinkPrimary>
        <l.Space
          height={[spacing.xl, 0]}
          width={[0, spacing.xxl, spacing.xxxxxl]}
        />
        <LinkPrimary to="/faqs" width={['100%', 'auto']}>
          <l.Img height={spacing.xl} src={QuestionMarkWhiteImg} />
          &nbsp;&nbsp;&nbsp; FAQs
        </LinkPrimary>
        <l.Space
          height={[spacing.xl, 0]}
          width={[0, spacing.xxl, spacing.xxxxxl]}
        />
        <LinkPrimary to="/gallery" width={['100%', 'auto']}>
          <GalleryImg color={colors.white} side={spacing.xl} />
          &nbsp;&nbsp;&nbsp; View our gallery
        </LinkPrimary>
      </l.FlexCentered>
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Mission);
