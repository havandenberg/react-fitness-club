import { ProgramContent } from '../types/program';

export const aikido = {
  description:
    'The Japanese martial art of Aikido is a comprehensive system of throwing, joint-locking, striking and pinning techniques, coupled with training in traditional Japanese weapons such as the sword, staff and knife. Taught by Sensei Köksal.',
  id: 'aikido',
  name: 'Aikido',
};

export const capoeira = {
  description:
    'African-Brazilian martial art that incorporates acrobatics, dance, music, and songs in a rhythmic dialogue of body, mind, and spirit. Taught by Professor Morcego.',
  id: 'capoeira',
  name: 'Capoeira Luanda',
};

export const qigongMeditation = {
  description:
    'A holistic system of coordinated body-posture and movement, breathing, and meditation[2] used for the purposes of health, spirituality, and martial-arts training. With roots in Chinese medicine, philosophy, and martial arts, qigong is traditionally viewed as a practice to cultivate and balance qi, translated as "life energy".',
  id: 'qigong-meditation',
  name: 'Qigong Meditation',
};

export const reactMma = {
  description:
    'A mixed martial arts system with 3 phases of training: stand up, take downs, and grappling. Taught by Coach Ryan. Ages 14+.',
  id: 'react-mma',
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
  qigongMeditation,
];
