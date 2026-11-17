import type { HeroSlide } from '../types';
import img1 from '../assets/hero-slider/1jpg.jpg';
import img2 from '../assets/hero-slider/2.jpg';
import img3 from '../assets/hero-slider/3.jpg';
import img4 from '../assets/hero-slider/4.jpg';
import img5 from '../assets/hero-slider/5.jpg';
import img6 from '../assets/hero-slider/6.jpg';
import img7 from '../assets/hero-slider/7.jpg';
import img8 from '../assets/hero-slider/8.jpg';
import img9 from '../assets/hero-slider/9.jpg';
import img10 from '../assets/hero-slider/10.jpg';
import img11 from '../assets/hero-slider/11.jpg';
import img12 from '../assets/hero-slider/12.jpg';
import img13 from '../assets/hero-slider/13.jpg';
import img14 from '../assets/hero-slider/14.jpg';
import img15 from '../assets/hero-slider/15.jpg';
import h2Img from '../assets/H2.jpg';

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    type: 'landscape',
    tag: 'Leadership with the People',
    badgeColor: 'green',
    title: 'Leadership with Integrity.',
    titleHighlight: 'Service with Impact.',
    description:
      'Serving the good people of Agona East with steadfast compassion, educational empowerment, and sustainable community development.',
    landscapeImage: img1,
  },
  {
    id: 2,
    type: 'paired-portrait',
    tag: 'Servant Leadership & Passion',
    badgeColor: 'red',
    title: 'Mama Pokua: A Mother for All,',
    titleHighlight: 'A Champion for the Youth.',
    description:
      'Affectionately called "Mama Pokua", Hon. Sawyerr is renowned across the Central Region for putting the people first in every legislative decision.',
    portraitImages: [
      { src: img2, caption: 'Grassroots Warmth' },
      { src: img3, caption: 'Mama Pokua in Agona East' },
    ],
  },
  {
    id: 3,
    type: 'landscape',
    tag: 'Transforming Communities',
    badgeColor: 'green',
    title: 'Delivering Tangible Progress',
    titleHighlight: 'Across Agona East.',
    description:
      'From clean mechanized water boreholes to maternal health clinics and school infrastructure, delivering real development to every village.',
    landscapeImage: img4,
  },
  {
    id: 4,
    type: 'paired-portrait',
    tag: 'Women & Grassroots Economy',
    badgeColor: 'green',
    title: 'Empowering Mothers & Traders',
    titleHighlight: 'with Economic Dignity.',
    description:
      'Disbursing revolving seed grants and processing equipment to thousands of market women and farming cooperatives across Agona East.',
    portraitImages: [
      { src: img5, caption: 'Market Women Support' },
      { src: img6, caption: 'Grassroots Engagement' },
      { src: img7, caption: 'Economic Independence' },
    ],
  },
  {
    id: 5,
    type: 'landscape',
    tag: 'Education for Every Child',
    badgeColor: 'red',
    title: 'Securing the Next Generation',
    titleHighlight: 'Through Education.',
    description:
      'Over 35,000 candidates supplied with free mathematical sets and hot nutritious lunch packages during BECE examinations across 42 schools.',
    landscapeImage: img8,
  },
  {
    id: 6,
    type: 'paired-portrait',
    tag: 'Parliamentary Stewardship',
    badgeColor: 'green',
    title: 'A Fierce Voice in the',
    titleHighlight: 'Parliament of Ghana.',
    description:
      'Championing rural health subventions, road maintenance, and youth employment on the floor of the 8th Parliament with integrity.',
    portraitImages: [
      { src: img9, caption: 'Parliamentary Caucus' },
      { src: img10, caption: 'Legislative Leadership' },
      { src: img11, caption: 'Public Accountability' },
    ],
  },
  {
    id: 7,
    type: 'paired-portrait',
    tag: 'Agona East Forward',
    badgeColor: 'red',
    title: 'United in Strength.',
    titleHighlight: 'Focused on Progress.',
    description:
      'Building a resilient, inclusive, and prosperous constituency through unity, mutual respect, and active civic participation.',
    portraitImages: [
      { src: img12, caption: 'Community Durbar' },
      { src: img13, caption: 'Cultural Heritage' },
      { src: img14, caption: 'Youth & Artisans' },
    ],
  },
  {
    id: 8,
    type: 'paired-portrait',
    tag: 'Grassroots Resilience',
    badgeColor: 'green',
    title: 'A Mother to All.',
    titleHighlight: 'A Pillar of Agona East.',
    description:
      'Standing firmly beside market women, farmers, students, and traditional leaders with unwavering compassion and accessible leadership.',
    portraitImages: [
      { src: img15, caption: 'Mama Pokua with Constituents' },
      { src: h2Img, caption: 'Servant of Agona East' },
    ],
  },
];
