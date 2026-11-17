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
import fa1 from '../assets/fa/fa1.jpg';
import fa2 from '../assets/fa/fa2.jpg';
import fa3 from '../assets/fa/fa3.jpg';
import fa4 from '../assets/fa/fa4.jpg';
import fa5 from '../assets/fa/fa5.jpg';
import fa6 from '../assets/fa/fa6.jpg';
import fa7 from '../assets/fa/fa7.jpg';
import fa8 from '../assets/fa/fa8.jpg';
import fa9 from '../assets/fa/fa9.jpg';
import fa10 from '../assets/fa/fa10.jpg';
import fa11 from '../assets/fa/fa11.jpg';
import fa12 from '../assets/fa/fa12.jpg';
import fa13 from '../assets/fa/fa13.jpg';
import fa14 from '../assets/fa/fa14.jpg';
import fa15 from '../assets/fa/fa15.jpg';
import fa16 from '../assets/fa/fa16.jpg';
import fa17 from '../assets/fa/fa17.jpg';
import fa18 from '../assets/fa/fa18.jpg';
import fa19 from '../assets/fa/fa19.jpg';
import fa20 from '../assets/fa/fa20.jpg';
import fa21 from '../assets/fa/fa21.jpg';

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
  {
    id: 9,
    type: 'paired-portrait',
    tag: 'Constituency Engagement',
    badgeColor: 'green',
    title: 'Deeply Rooted in Agona East.',
    titleHighlight: 'Listening to Every Voice.',
    description:
      'Walking through every village and hamlet, listening to elders, youth, and families with humility, dedication, and active care.',
    portraitImages: [
      { src: fa1, caption: 'Grassroots Listening Tour' },
      { src: fa2, caption: 'Heart of Agona East' },
    ],
  },
  {
    id: 10,
    type: 'paired-portrait',
    tag: 'Servant Leadership',
    badgeColor: 'red',
    title: 'Standing with the People.',
    titleHighlight: 'In Every Season of Life.',
    description:
      'Accessible, hands-on leadership that meets people right where they are, bringing hope and practical solutions to daily community challenges.',
    portraitImages: [
      { src: fa3, caption: 'Community Fellowship' },
      { src: fa4, caption: 'Mama Pokua in Service' },
      { src: fa5, caption: 'Grassroots Engagement' },
    ],
  },
  {
    id: 11,
    type: 'paired-portrait',
    tag: 'Women Empowerment',
    badgeColor: 'green',
    title: 'Championing Mothers & Families.',
    titleHighlight: 'Economic Dignity in Every Home.',
    description:
      'Standing firmly behind market women, farmers, and family heads with revolving micro-grants, mechanized processing tools, and business guidance.',
    portraitImages: [
      { src: fa6, caption: 'Market Women Solidarity' },
      { src: fa7, caption: 'Maternal Dignity' },
    ],
  },
  {
    id: 12,
    type: 'paired-portrait',
    tag: 'Youth Development',
    badgeColor: 'red',
    title: 'Inspiring the Next Generation.',
    titleHighlight: 'Unlocking Boundless Potential.',
    description:
      'Empowering our youth through educational subsidies, vocational skills apprenticeship, and educational supplies to build a prosperous tomorrow.',
    portraitImages: [
      { src: fa8, caption: 'Youth Mentorship' },
      { src: fa9, caption: 'Future Leaders of Agona' },
    ],
  },
  {
    id: 13,
    type: 'paired-portrait',
    tag: 'Unity & Heritage',
    badgeColor: 'green',
    title: 'United in Heritage & Purpose.',
    titleHighlight: 'Honoring Our Traditions.',
    description:
      'Partnering closely with revered traditional chiefs, queenmothers, and community custodians to foster peace, cultural pride, and inclusive development.',
    portraitImages: [
      { src: fa10, caption: 'Traditional Durbar' },
      { src: fa11, caption: 'Cultural Heritage' },
      { src: fa12, caption: 'Community Solidarity' },
    ],
  },
  {
    id: 14,
    type: 'paired-portrait',
    tag: 'Infrastructure Oversight',
    badgeColor: 'red',
    title: 'Delivering Everyday Results.',
    titleHighlight: 'Action and Accountability.',
    description:
      'Personally inspecting rural roads, water boreholes, school facilities, and CHPS clinics to ensure uncompromising quality for our people.',
    portraitImages: [
      { src: fa13, caption: 'Field Project Inspection' },
      { src: fa14, caption: 'Development in Action' },
    ],
  },
  {
    id: 15,
    type: 'paired-portrait',
    tag: 'A Mother to All',
    badgeColor: 'green',
    title: 'A Pillar of Compassion.',
    titleHighlight: 'Beloved Across the Central Region.',
    description:
      'Affectionately called Mama Pokua for her unwavering warmth, accessible presence, and lifelong dedication to uplifting the vulnerable.',
    portraitImages: [
      { src: fa15, caption: 'Grassroots Warmth' },
      { src: fa16, caption: 'Mama Pokua with Constituents' },
      { src: fa17, caption: "The People's Choice" },
    ],
  },
  {
    id: 16,
    type: 'landscape',
    tag: 'Agona East Rising',
    badgeColor: 'green',
    title: 'Forward Together for Agona East.',
    titleHighlight: 'Building a Resilient Constituency.',
    description:
      'A unified constituency forging forward in mutual respect, sustainable economic growth, and steadfast leadership for the generations ahead.',
    landscapeImage: fa18,
  },
  {
    id: 17,
    type: 'paired-portrait',
    tag: 'Community Progress',
    badgeColor: 'red',
    title: 'Transforming Lives Daily.',
    titleHighlight: 'Agona East Flourishes.',
    description:
      'Working tirelessly on the ground with grassroots communities, women traders, and local champions to bring real, lasting development across Agona East.',
    portraitImages: [
      { src: fa19, caption: 'Community Dialogue' },
      { src: fa20, caption: 'Grassroots Solidarity' },
    ],
  },
  {
    id: 18,
    type: 'landscape',
    tag: 'A Future of Hope',
    badgeColor: 'green',
    title: 'Visionary Leadership.',
    titleHighlight: 'Empowering Every Citizen.',
    description:
      'Steadfast dedication to uplifting Agona East through accessible leadership, robust infrastructure, and educational excellence for every family.',
    landscapeImage: fa21,
  },
];
