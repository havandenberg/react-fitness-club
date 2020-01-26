import BrettImg from '../assets/images/instructors/brett.png';
import HeatherImg from '../assets/images/instructors/heather.png';
import JohnImg from '../assets/images/instructors/john.jpg';
import KoksalImg from '../assets/images/instructors/koksal.jpg';
import MorcegoImg from '../assets/images/instructors/morcego.jpg';
import { ASSETS_PATH } from '../utils/constants';

export const john = {
  name: 'Coach John Ryan',
  photoSrc: JohnImg,
};

export const morcego = {
  bio:
    'Professor Morcego, born Alexandro Silveira in Salvador Bahia, has been training capoeira since age 7.  Morcego   recently moved to the United States to continue his mission of sharing Brazilian culture and the art of capoeira with the world. Professor Morcego has performed in Hamilton, Bermuda visited the island at the weekend to support charity Project Change: Bermuda, which provides reconstructive surgery for people living in poverty around the world, Houston, New York, Framingham, Boston, and all over the country.  He provides workshops and performances for schools, groups, adult education, and individuals. In addition, Professor Morcego enjoys the music of capoeira and has written many original songs that attest to his talent in all areas of the art. Here is one of Morcego\'s songs, "Birimbau Chamou Voce."',
  name: 'Professor Morcego',
  photoSrc: MorcegoImg,
};

export const koksal = {
  bio:
    'Koksal Mus Sensei holds the rank of 5th dan from Nebi Vural Sensei who is the technical director of Eurasia Aikido Organization and direct student of Nobuyoshi Tamura Shihan. Between 2010 and 2016, he served as the head instructor of METU Aikido Society with around 200 active group members. In the same period of time, he also served as a board member of Aikido and Budo Federation of Turkey, with the responsibility of organizing national and international Aikido events throughout the country, including one of the biggest Aikido events in Europe, the International Aikido Festival.',
  name: 'Sensei Köksal',
  photoSrc: KoksalImg,
};

export const brett = {
  bio:
    'Brett Maguire is a trad climber, yogi, and professional classical musician. He is a Kripalu-certified yoga instructor (RYT 200) and has practiced Ashtanga yoga daily for the past five years. A CRG member since 2011, Brett climbs regularly at Crow Hill, Farley, Rumney, Cannon, and Cathedral. He is passionate about helping others find ease and joy in their bodies through the tools of yoga and meditation.',
  logoSrc: `${ASSETS_PATH}/programs/Yoga/climbers.png`,
  name: 'Brett Maguire',
  photoSrc: BrettImg,
};

export const heather = {
  bio:
    'I started DDPY in 2012, after a series of bad car accidents left me feeling sore and achy all the time. The results were nearly immediate: within just a few weeks, my hips weren’t as sore and my back wasn’t as stiff. Since then, I’ve seen tremendous improvements in my balance, strength, and flexibility. DDPY has helped me explore the mind-body connection. When I feel strong in my body, I feel strong in my mind – and vice-versa. I enjoy challenging myself to see what I can do next, whether it’s an inversion, a tricky position, or a workout that seems particularly tough. My goal is to help you find the same mental and physical strength to “namaslay” everything and own your life!',
  logoSrc: `${ASSETS_PATH}/programs/Yoga/namaslay.png`,
  name: 'Heather Berkowitz',
  photoSrc: HeatherImg,
};

export const henry = {
  name: 'Henry Whitwell Wales IV',
};

export const hack = {
  bio:
    'Hi!  My name is Alex and I have been DMing for the past five (5) years mostly in the 5e system for Dungeons & Dragons but do have experience with Pathfinder and the Fate system.  I am a big fan of sandbox style campaigns as I want my players to feel like the world is truly theirs to explore, instead of feeling forced to only follow one plot line.  My philosophy is "No enemy is more dangerous to the party than the party themselves" and boy could I tell you stories about some of the hijinks I\'ve seen.  I\'m a pretty flexible DM and love trying new things with my players, hope to see you on the campaign!',
  logoSrc: `${ASSETS_PATH}/programs/D&D/d&d-logo.png`,
  name: 'Alex Hackathorn',
};
