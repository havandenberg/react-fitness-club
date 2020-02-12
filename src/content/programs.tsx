import * as React from 'react';
import l from '../styles/layout';
import { borders, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { ProgramContent } from '../types/program';
// import { ASSETS_PATH } from '../utils/constants';
// import { scrollToId } from '../utils/scroll';
import * as instructors from './instructors';

export const aikido = {
  description: (
    <t.JustifiedText mb={spacing.ml}>
      At the heart of aikido is the concept of ‘ki’ or one’s ‘life-force’.
      Aikido training seeks to fuse universal ki which flows within each
      individual. Aikido translates as “the Way of harmonious spirit”, and like
      other budo arts seeks for the unification of technique, body, and mind.
      The way one holds his or her heart in aikido lies at the root of ai-ki
      (harmony with ki), which is, according to Ueshiba Morihei (the Founder of
      aikido), “love”. Budo literally means “martial way”. As aikido is a budo
      art, the techniques utilized derive from combat systems created by
      warriors in Japan’s feudal age. However, Morihei’s philosophy was to
      combine the techniques with the spirit of heaven and earth, thus creating
      a ‘Way’ for training body and mind with unreserved love for all things.
    </t.JustifiedText>
  ),
  id: 'aikido',
  instructors: [instructors.koksal],
  name: 'Aikido',
};

export const capoeira = {
  description: (
    <t.JustifiedText mb={spacing.ml}>
      Capoeira is an African-Brazilian martial art that incorporates acrobatics,
      dance, music, and songs in a rhythmic dialogue of body, mind, and spirit.
      It is a communal game in which two opponents play each other inside the
      roda (a circle), formed by the other players who create rhythm for the
      game by clapping, singing and playing the berimbaus (African-Brazilian
      traditional instruments, considered the soul of Capoeira) and other key
      instruments. The two opponents compete with each other using capoeira
      movements, camouflaging the self defense kicks and moves with playful
      acrobatics and dance-like moves spontaneously creating strategy to fool
      their partner and catch them off guard.
    </t.JustifiedText>
  ),
  id: 'capoeira',
  instructors: [instructors.morcego],
  name: 'Capoeira Luanda',
};

export const dungeons = {
  description: (
    <t.JustifiedText mb={spacing.ml}>
      D&D is an excellent way to make friends, be social, and explore the new
      and exciting world of table top gaming! We at RFC started our new "Social
      Saturdays" program recently and D&D became a quick favorite of the gym so
      a completely original campaign was made to support it! The current
      campaign is set in a distant fantasy world named Evanon where Heroes &
      villains fight for dominance and Monsters roam the land. Do you and your
      friends have what it takes to save the land from the evil threatening it? 
      Or will you join the forces of darkness and bring about destruction and
      chaos? If you have a desire to act as a tough barbarian, a sneaky rogue, a
      wise wizard, or even a fun loving bard, now is the time to try it out and
      join us! The choices are yours to make, just remember, every choice has a
      consequence!
    </t.JustifiedText>
  ),
  id: 'dungeons',
  instructors: [instructors.hack],
  name: 'Dungeons & Dragons',
};

export const qigongMeditation = {
  description: (
    <t.JustifiedText mb={spacing.ml}>
      A holistic system of coordinated body-posture and movement, breathing, and
      meditation used for the purposes of health, spirituality, and martial-arts
      training. With roots in Chinese medicine, philosophy, and martial arts,
      qigong is traditionally viewed as a practice to cultivate and balance qi,
      translated as "life energy".
    </t.JustifiedText>
  ),
  id: 'qigong-meditation',
  instructors: [instructors.henry],
  name: 'Qigong Meditation',
};

export const yoga = {
  description: (
    <>
      {/* <t.JustifiedText mb={spacing.ml}>
        RFC offers 3 different types of yoga as part of our yoga package:
      </t.JustifiedText>
      <l.Flex mb={spacing.ml}>
        <l.Img
          height={spacing.xxl}
          src={`${ASSETS_PATH}/programs/Yoga/namaslay.png`}
        />
        <t.JustifiedText bold id="ddpy" ml={spacing.m}>
          DDPYoga (
          <l.Span
            onClick={() => scrollToId('Heather Berkowitz', { offset: -210 })}
          >
            with Heather
          </l.Span>
          )
        </t.JustifiedText>
      </l.Flex> */}
      <t.JustifiedText mb={spacing.ml}>
        DDPYoga combines traditional yoga positions with calisthenics like
        squats and push ups, sports rehab therapy principles, and dynamic
        resistance. The result is a low impact, high cardio, total body workout
        that is suitable for all fitness and ability levels. Classes are loud,
        interactive, and high energy - this definitely "ain't your mama's yoga!"
        No previous yoga experience is required, beginners welcomed and
        encouraged.
      </t.JustifiedText>
      <l.FlexCentered width="100%">
        <t.Anchor
          border={borders.red}
          href="https://namaslayfitnessma.wixsite.com/namaslay"
          target="_blank"
        >
          <t.JustifiedText color={colors.red} large>
            Learn more about Heather & Namaslay Fitness
          </t.JustifiedText>
        </t.Anchor>
      </l.FlexCentered>
      {/* <l.Flex mb={spacing.ml} mt={spacing.xl}>
        <l.Img
          height={spacing.xxl}
          src={`${ASSETS_PATH}/programs/Yoga/climbers.png`}
        />
        <t.JustifiedText bold id="climbers" ml={spacing.m}>
          Yoga for Climbers & Martial Artists (
          <l.Span onClick={() => scrollToId('Brett Maguire', { offset: -210 })}>
            with Brett
          </l.Span>
          )
        </t.JustifiedText>
      </l.Flex>
      <t.JustifiedText mb={spacing.xl}>
        Sometimes the best way to grow in one activity is through training a
        different discipline. Yoga, climbing, and martial arts are three
        practices that enhance the others, intersecting in the development of
        body awareness, the cultivation of a steady mind, and the need for calm
        breathing. This class incorporates practices from yoga, Qigong, exercise
        science, and meditation. Poses will be offered with explanations and
        modifications for practitioners of all levels. Climbers and martial
        artists can expect to improve balance, gain core strength, and increase
        flexibility and range of motion through regular practice.
      </t.JustifiedText>
      <l.Flex mb={spacing.ml}>
        <l.Img
          height={spacing.xxl}
          src={`${ASSETS_PATH}/programs/Yoga/climbers.png`}
        />
        <t.JustifiedText bold id="ashtanga" ml={spacing.m}>
          Ashtanga Power Yoga (
          <l.Span onClick={() => scrollToId('Brett Maguire', { offset: -210 })}>
            with Brett
          </l.Span>
          )
        </t.JustifiedText>
      </l.Flex>
      <t.JustifiedText mb={spacing.xl}>
        Ashtanga is the bouldering of yoga: it is challenging, rigorous, and
        offers a lifetime of practice and growth. The emphasis is on linking
        movement with breath, following a regular sequence of poses so that
        practitioners can grow in fluency over time. By moving steadily through
        poses, the body generates heat that helps open and lengthen muscles.
        Through Ashtanga yoga, climbers can develop tremendous amounts of
        flexibility, core strength, and steadiness. By increasing awareness and
        flexibility in the body, we can enhance mental agility as well,
        ultimately fostering a steadier experience on the rock.
      </t.JustifiedText> */}
    </>
  ),
  id: 'yoga',
  instructors: [instructors.heather],
  name: 'DDPYoga',
};

export const reactMma = {
  description: (
    <t.JustifiedText mb={spacing.ml}>
      A mixed martial arts system with 3 phases of training: stand up, take
      downs, and grappling. Taught by Coach Ryan.
    </t.JustifiedText>
  ),
  id: 'react-mma',
  instructors: [instructors.john],
  name: 'REaCT MMA',
};

export const ocrTeam = {
  description: (
    <>
      <t.JustifiedText mb={spacing.ml}>
        Looking for an extra challenge? Join our OCR Team! Tough Mudders,
        Spartan Races - you name it, we run it! This program is dedicated to
        training and upkeep for obstacle course races, consisting of one
        scheduled short (~1-2 miles) training run and one longer run (2+ miles)
        per week.
      </t.JustifiedText>
      <t.JustifiedText mb={spacing.ml}>
        If you are just getting started running and obstacle courses seem cool
        (they are 😉) but way outside your ability/fitness level, don't worry!
        Come to one of our short runs to get started and we will start building
        basic strength and techniques at your pace. This is a Team program - no
        one crosses the finish line alone! Check out our events page for the
        next upcoming obstacle course race we are attending! If you are within 2
        months of an event, we recommend coming to both trainings each week.
      </t.JustifiedText>
      <t.JustifiedText mb={spacing.ml}>
        Want to run another course that we haven't picked up yet? Let us know!
        Chances are one of the team will be interesting in joining you. No
        matter which events our team members are training for, our coaches will
        help you get as ready as possible and provide support through the finish
        line.
      </t.JustifiedText>
      <t.JustifiedText mb={spacing.ml}>
        All training courses start at RFC unless otherwise stated in the
        calendar event in the{' '}
        <t.Link border={borders.red} color={colors.red} to="/schedule">
          schedule
        </t.Link>
        .
      </t.JustifiedText>
      <t.JustifiedText mb={spacing.ml}>
        <t.Anchor
          border={borders.red}
          color={colors.red}
          href="https://www.mudrunguide.com/"
          target="_blank"
        >
          Here's a link
        </t.Anchor>{' '}
        to some info about OCR Training where we find most of our events if you
        want to learn more about the sport!
      </t.JustifiedText>
    </>
  ),
  id: 'ocr-team',
  instructors: [],
  name: 'Obstacle Course Racing',
};

export const reactSkillz = {
  description:
    'Our REaCT Skillz program is focused on teaching children ages 3 - 14 focus, self-discipline, self-confidence, better grades, self-control, leadership, resilience, better behavior at home and school. All of our drills and warmups are age specific which leads to faster and more lasting progress. We ensure this is a safe place for your children to come together, share a common experience and cooperate and collaborate more with less squabbling and fighting. This is a place where your children can build their character by practicing respect, humility, honesty, determination, compassion, resilience, service and collaboration, all with a growth mindset.',
  id: 'react-skillz',
  name: 'REaCT Skillz',
};

export const programContent: ProgramContent[] = [
  reactMma,
  capoeira,
  aikido,
  yoga,
  ocrTeam,
  dungeons,
  qigongMeditation,
];
