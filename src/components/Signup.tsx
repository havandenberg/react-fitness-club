import * as React from 'react';
import BulletImg from '../assets/images/bullet.svg';
import SignupImg from '../assets/images/signup';
import UserImg from '../assets/images/user';
import l from '../styles/layout';
import {
  borders,
  colors,
  fontSizes,
  gradients,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { isMobileOnly } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import { ButtonPrimary } from './Form/Button';
import withScroll from './hoc/withScroll';
import { Bullet } from './Home';
import { Badge } from './Programs';

const Signup = () => (
  <div>
    <t.Title center pb={spacing.ml}>
      <l.FlexCentered>
        <l.Space mr={spacing.ml}>
          <SignupImg side={[spacing.xxl, spacing.xxl, spacing.xxxxl]} />
        </l.Space>
        RFC Sign Up
      </l.FlexCentered>
    </t.Title>
    <Divider white />
    <l.Page
      px={[spacing.sm, 0]}
      py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}
    >
      <l.Space mb={spacing.xxl} mx="auto" width={['100%', '100%', '80%']}>
        <l.FlexCentered>
          <t.Text center large mb={spacing.ml}>
            Already an RFC member?
          </t.Text>
        </l.FlexCentered>
        <l.FlexCentered mb={spacing.xl}>
          <t.Anchor href="https://rfc.kicksite.net/" target="_blank">
            <ButtonPrimary size="small">
              <l.Flex>
                <UserImg side={spacing.l} color={colors.white} />
                <l.Space width={spacing.m} />
                Login Here
              </l.Flex>
            </ButtonPrimary>
          </t.Anchor>
        </l.FlexCentered>
        <l.FlexCentered>
          <t.Link
            border={borders.red}
            center
            color={colors.red}
            hoverStyle="underline"
            mb={spacing.xxl}
            to="/signup/new"
          >
            New Member?
          </t.Link>
        </l.FlexCentered>
        <l.Flex mb={spacing.ml} spaceBetween>
          <t.H1 alignSelf="flex-start">Signup Options</t.H1>
          <t.TextButton
            onClick={() => scrollToId('multipass', { offset: -100 })}
          >
            <l.Flex
              justifyContent={isMobileOnly() ? 'space-between' : undefined}
            >
              <t.Text
                color={colors.red}
                fontSize={[fontSizes.text, fontSizes.helpText, fontSizes.text]}
                mr={spacing.sm}
                textAlign="right"
              >
                Unlimited access with
              </t.Text>
              <Badge
                background={gradients.multipass}
                p={[spacing.s, spacing.s]}
              >
                <t.H2
                  color={colors.white}
                  fontSize={[
                    fontSizes.helpText,
                    fontSizes.helpText,
                    fontSizes.helpText,
                  ]}
                  fontWeight="normal"
                  nowrap
                >
                  Multi-Pass
                </t.H2>
              </Badge>
            </l.Flex>
          </t.TextButton>
        </l.Flex>
        <l.Line width="100%" />
        <l.Flex mb={spacing.ml} mt={spacing.xxxl}>
          <t.Text bold large width={200}>
            2 Intro Classes:
          </t.Text>
          <t.Text
            bold
            color={colors.green}
            large
            textAlign={isMobileOnly() ? 'right' : 'left'}
          >
            FREE!
          </t.Text>
        </l.Flex>
        <t.Text mb={spacing.ml}>
          Come in to <l.Blue>any program</l.Blue> for a free intro class! We
          want you to know what value you will be getting out of each of our
          programs before you decide to pay for them 😉.
        </t.Text>
        <t.Text mb={spacing.ml}>
          Check out our full program schedule{' '}
          <t.Link border={borders.red} color={colors.red} to="/schedule">
            here
          </t.Link>
          .
        </t.Text>
        <t.Text>
          You can also schedule a free private intro class outside normal class
          times for yourself or a small group with one of our coaches by
          contacting us{' '}
          <t.Link border={borders.red} color={colors.red} to="/contact">
            here
          </t.Link>
          .
        </t.Text>
        <l.Line my={spacing.xxxxxl} />
        <l.Flex mb={spacing.ml}>
          <t.Text bold large width={200}>
            Day Pass:
          </t.Text>
          <t.Text
            bold
            color={colors.darkBlue}
            large
            textAlign={isMobileOnly() ? 'right' : 'left'}
          >
            $15/day
          </t.Text>
        </l.Flex>
        <l.Flex>
          <Bullet secondary src={BulletImg} />
          <t.Text>
            Access to all RFC classes for one day, not including special events.
          </t.Text>
        </l.Flex>
        <l.Line my={spacing.xxxxxl} />
        <t.Text bold large mb={spacing.ml}>
          Single Program Membership:
        </t.Text>
        <l.Flex mb={spacing.ml}>
          <Bullet secondary src={BulletImg} />
          <t.Text>
            Full access to classes of one program. Each program has different
            monthly pricing options.
          </t.Text>
        </l.Flex>
        <l.Flex mb={spacing.xxxl}>
          <Bullet secondary src={BulletImg} />
          <t.Text>2 free day passes per month.</t.Text>
        </l.Flex>
        <t.Text mb={spacing.ml}>
          Browse our current programs{' '}
          <t.Link border={borders.red} color={colors.red} to="/programs">
            here
          </t.Link>
          .
        </t.Text>
        <t.Text>See below for specific program pricing.</t.Text>
        <l.Line my={spacing.xxxxxl} />
        <l.Flex mb={spacing.xl}>
          <Badge
            background={gradients.multipass}
            id="multipass"
            p={[spacing.s, spacing.m]}
          >
            <t.H2
              color={colors.white}
              fontSize={[fontSizes.text, fontSizes.largeText]}
              fontWeight="normal"
              nowrap
            >
              Multi-Pass:
            </t.H2>
          </Badge>
        </l.Flex>
        <l.Flex mb={spacing.ml}>
          <Bullet secondary src={BulletImg} />
          <t.Text>
            <l.Blue>Unlimited access to all RFC programs and events!</l.Blue>
          </t.Text>
        </l.Flex>
        <l.Flex mb={spacing.ml}>
          <Bullet secondary src={BulletImg} />
          <t.Text>5 free day passes per month.</t.Text>
        </l.Flex>
        <l.Flex mb={spacing.xxxl}>
          <Bullet secondary src={BulletImg} />
          <t.Text />
        </l.Flex>
        <t.Text bold mb={spacing.ml} width="50%">
          Family Multipass:
        </t.Text>
        <t.Text>
          We want to encourage families to come get healthy together! Families
          up to 4 receive full Multipass access to all programs for the Family
          Multipass price.
        </t.Text>
        <l.Line my={spacing.xxxxxl} />
        <t.Text bold large mb={spacing.ml} width="50%">
          Program Pricing:
        </t.Text>
        <t.Text mb={spacing.xxxl}>
          To receive an email with all of our program pricing options, please
          enter your name and email below:
        </t.Text>
        <l.Space height={400} mb={spacing.xxxxxl} mx="auto" width={400}>
          <l.Frame src="https://rfc.kicksite.net/bizbuilders/lead_capture_forms/eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoibGNmXzEyNyJ9.zvVqiPPdSM5WHrmeH9QYX-rvsmM3-XYFEBWKrdYPHEQ" />
        </l.Space>
        <l.FlexCentered>
          <t.Link
            border={borders.red}
            center
            color={colors.red}
            hoverStyle="underline"
            large
            mb={spacing.xxl}
            to="/signup/new"
          >
            Sign up here.
          </t.Link>
        </l.FlexCentered>
        <l.Space height={100} />
      </l.Space>
    </l.Page>
  </div>
);

export default withScroll(Signup);
