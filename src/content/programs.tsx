import * as React from 'react';
import l from '../styles/layout';
import { borders, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { ProgramContent } from '../types/program';
import * as instructors from './instructors';

export const aikido = {
  description: (
    <t.Text mb={spacing.ml}>
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
    </t.Text>
  ),
  id: 'aikido',
  instructors: [instructors.koksal],
  name: 'Aikido',
};

export const capoeira = {
  description: (
    <t.Text mb={spacing.ml}>
      African-Brazilian martial art that incorporates acrobatics, dance, music,
      and songs in a rhythmic dialogue of body, mind, and spirit.
    </t.Text>
  ),
  id: 'capoeira',
  instructors: [instructors.morcego],
  name: 'Capoeira Luanda',
};

export const qigongMeditation = {
  description: (
    <t.Text mb={spacing.ml}>
      A holistic system of coordinated body-posture and movement, breathing, and
      meditation used for the purposes of health, spirituality, and martial-arts
      training. With roots in Chinese medicine, philosophy, and martial arts,
      qigong is traditionally viewed as a practice to cultivate and balance qi,
      translated as "life energy".
    </t.Text>
  ),
  id: 'qigong-meditation',
  instructors: [instructors.henry],
  name: 'Qigong Meditation',
};

export const yoga = {
  description: (
    <>
      <t.Text mb={spacing.ml}>
        RFC offers 3 different types of yoga as part of our yoga package:
      </t.Text>
      <t.Text bold mb={spacing.ml}>
        DDPYoga (with Heather)
      </t.Text>
      <t.Text mb={spacing.ml}>
        DDPYoga combines traditional yoga positions with calisthenics like
        squats and push ups, sports rehab therapy principles, and dynamic
        resistance. The result is a low impact, high cardio, total body workout
        that is suitable for all fitness and ability levels. Classes are loud,
        interactive, and high energy - this definitely "ain't your mama's yoga!"
        No previous yoga experience is required, beginners welcomed and
        encouraged.
      </t.Text>
      <l.FlexCentered width="100%">
        <t.Anchor
          border={borders.red}
          href="https://namaslayfitnessma.wixsite.com/namaslay"
          target="_blank"
        >
          <t.Text color={colors.red}>
            Learn more about Heather & Namaslay Fitness
          </t.Text>
        </t.Anchor>
      </l.FlexCentered>
      <t.Text bold my={spacing.ml}>
        Yoga for Climbers & Martial Artists (with Brett)
      </t.Text>
      <t.Text mb={spacing.ml}>
        Sometimes the best way to grow in one activity is through training a
        different discipline. Yoga, climbing, and martial arts are three
        practices that enhance the others, intersecting in the development of
        body awareness, the cultivation of a steady mind, and the need for calm
        breathing. Designed specifically for climbers, this class incorporates
        practices from yoga, Qigong, exercise science, and meditation. Poses
        will be offered with explanations and modifications for practitioners of
        all levels. Climbers and martial artists can expect to improve balance,
        gain core strength, and increase flexibility and range of motion through
        regular practice.
      </t.Text>
      <t.Text bold mb={spacing.ml}>
        Ashtanga Power Yoga (with Brett)
      </t.Text>
      <t.Text mb={spacing.ml}>
        Ashtanga is the bouldering of yoga: it is challenging, rigorous, and
        offers a lifetime of practice and growth. The emphasis is on linking
        movement with breath, following a regular sequence of poses so that
        practitioners can grow in fluency over time. By moving steadily through
        poses, the body generates heat that helps open and lengthen muscles.
        Through Ashtanga yoga, climbers can develop tremendous amounts of
        flexibility, core strength, and steadiness. By increasing awareness and
        flexibility in the body, we can enhance mental agility as well,
        ultimately fostering a steadier experience on the rock.
      </t.Text>
    </>
  ),
  id: 'yoga',
  instructors: [instructors.heather, instructors.brett],
  name: 'Yoga',
};

export const reactMma = {
  description: (
    <t.Text mb={spacing.ml}>
      A mixed martial arts system with 3 phases of training: stand up, take
      downs, and grappling. Taught by Coach Ryan.
    </t.Text>
  ),
  id: 'react-mma',
  instructors: [instructors.john],
  name: 'REaCT MMA',
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
  qigongMeditation,
];
