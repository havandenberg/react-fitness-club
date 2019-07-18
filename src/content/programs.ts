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
  description: 'Medical Qigong\n\'Invisible Needle\'\nAcupuncture\nReiki',
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

export const taekwondo = {
  description: '',
  id: 'taekwondo',
  name: 'Taekwondo',
};

export const zumba = {
  description:
    'Zumba is a fitness program inspired by various rhythms and dancing styles. The routines feature aerobic/fitness interval training with a combination of fast and slow dance moves that tone and sculpt the body. Some popular genres are reggaeton, pop, hip-hop, cumbia, merengue and more! Taught by Daniele.',
  id: 'zumba',
  name: 'Zumba',
};

export const programContent: ProgramContent[] = [
  reactSkillz,
  reactMma,
  capoeira,
  aikido,
  zumba,
  qigongMeditation,
];
