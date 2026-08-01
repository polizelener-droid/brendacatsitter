import griseldaImg from '../assets/images/griselda.png';
import sexyImg from '../assets/images/sexy.png';
import isisImg from '../assets/images/isis.png';
import emaImg from '../assets/images/ema.png';
import lukeImg from '../assets/images/luke.png';
import teraImg from '../assets/images/tera.png';
import tiliYJuliImg from '../assets/images/tili_y_juli.png';
import ambarYMorganImg from '../assets/images/ambar_y_morgan.png';
import arielImg from '../assets/images/ariel.png';
import uguriaYAgathaImg from '../assets/images/uguria_y_agatha.png';
import lunaImg from '../assets/images/luna.png';
import cristianoImg from '../assets/images/cristiano.png';
import plateroImg from '../assets/images/cat_platero_1785260516733.jpg';

export interface CatClient {
  id: string;
  name: string;
  owner: string;
  image: string;
  story: string;
  personality: string[];
  favoriteActivity: string;
  visitsCount: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  verified: boolean;
  catName?: string;
  avatarBg: string;
  date: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'visitas' | 'pagos' | 'seguridad';
}

export interface ContactInfo {
  whatsapp: string;
  phoneFormatted: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  tiktok: string;
  tiktokUrl: string;
  whatsappBaseMessage: string;
}

export interface ServiceRates {
  duration: string;
  periodNotice: string;
  weekday: string;
  saturday: string;
  sundayHoliday: string;
  interview: string;
  interviewDesc: string;
  keyHandover: string;
  paymentTerms: string;
  cancellationPolicy: string;
}

export const HERO_IMAGE = plateroImg;

export const CONTACT_INFO: ContactInfo = {
  whatsapp: '5491161386748',
  phoneFormatted: '+54 9 11 6138-6748',
  email: 'brendacatsitter@gmail.com',
  instagram: 'brendacatsitter',
  instagramUrl: 'https://www.instagram.com/brendacatsitter/',
  tiktok: 'brendanusynkier',
  tiktokUrl: 'https://www.tiktok.com/@brendanusynkier?lang=es',
  whatsappBaseMessage: 'Hola Brenda! Me gustaría consultar disponibilidad y tarifas para el cuidado de mi gato',
};

export const CAT_CLIENTS: CatClient[] = [
  {
    id: 'griselda',
    name: 'Griselda',
    owner: 'Familia Griselda',
    image: griseldaImg,
    story: '',
    personality: ['Elegante', 'Gris', 'Atenta', 'Serena', 'Observadora'],
    favoriteActivity: 'Vigilar desde el sillón',
    visitsCount: 18,
  },
  {
    id: 'sexy',
    name: 'Sexy',
    owner: 'Familia Sexy',
    image: sexyImg,
    story: '',
    personality: ['Calicó tricolor', 'Relajada', 'Divertida', 'Solera', 'Afectuosa'],
    favoriteActivity: 'Tomar sol en la mesa',
    visitsCount: 17,
  },
  {
    id: 'isis',
    name: 'Isis',
    owner: 'Familia Isis',
    image: isisImg,
    story: '',
    personality: ['Juguetona', 'Atigrada', 'Curiosa', 'Ágil', 'Chispita'],
    favoriteActivity: 'Perseguir juguetes',
    visitsCount: 16,
  },
  {
    id: 'ema',
    name: 'Ema',
    owner: 'Familia Ema',
    image: emaImg,
    story: '',
    personality: ['Tuxedo elegante', 'Atenta', 'Sociable', 'Distinguida', 'Guardiana'],
    favoriteActivity: 'Vigilar desde el sillón',
    visitsCount: 22,
  },
  {
    id: 'luke',
    name: 'Luke',
    owner: 'Familia Luke',
    image: lukeImg,
    story: '',
    personality: ['Juguetón', 'Energético', 'Atigrado', 'Curioso', 'Aventurero'],
    favoriteActivity: 'Jugar en el patio',
    visitsCount: 19,
  },
  {
    id: 'tera',
    name: 'Tera',
    owner: 'Familia Tera',
    image: teraImg,
    story: '',
    personality: ['Esponjosa', 'Mimosa', 'Tranquila', 'Elegante', 'Dulce'],
    favoriteActivity: 'Acurrucarse al sol',
    visitsCount: 15,
  },
  {
    id: 'tili-y-juli',
    name: 'Tili y Juli',
    owner: 'Familia Tili y Juli',
    image: tiliYJuliImg,
    story: '',
    personality: ['Hermanitos', 'Compañeros', 'Tranquilos', 'Afectuosos', 'Inseparables'],
    favoriteActivity: 'Relajarse juntos',
    visitsCount: 26,
  },
  {
    id: 'ambar-y-morgan',
    name: 'Ámbar y Morgan',
    owner: 'Familia Ámbar y Morgan',
    image: ambarYMorganImg,
    story: '',
    personality: ['Elegantes', 'Curiosos', 'Heterocromía única', 'Misteriosos', 'Reales'],
    favoriteActivity: 'Acompañar en la mesa',
    visitsCount: 21,
  },
  {
    id: 'ariel',
    name: 'Ariel',
    owner: 'Familia Ariel',
    image: arielImg,
    story: '',
    personality: ['Juguetón', 'Divertido', 'Atigrado', 'Travieso', 'Cariñoso'],
    favoriteActivity: 'Morder la cuerda',
    visitsCount: 12,
  },
  {
    id: 'uguria-y-agatha',
    name: 'Uguria y Agatha',
    owner: 'Familia Uguria y Agatha',
    image: uguriaYAgathaImg,
    story: '',
    personality: ['Observadoras', 'Calicó y Carey', 'Inseparables', 'Dulces', 'Curiosas'],
    favoriteActivity: 'Espiar el balcón',
    visitsCount: 28,
  },
  {
    id: 'luna',
    name: 'Luna',
    owner: 'Familia Luna',
    image: lunaImg,
    story: '',
    personality: ['Tricolor', 'Atenta', 'Elegante', 'Serena', 'Mimosa'],
    favoriteActivity: 'Posar en la mesa',
    visitsCount: 14,
  },
  {
    id: 'cristiano',
    name: 'Cristiano',
    owner: '@adru_baccaro',
    image: cristianoImg,
    story: '',
    personality: ['Elegante', 'Comunicativo', 'Tranquilo', 'Expresivo', 'Mimoso'],
    favoriteActivity: 'Masajes en las orejitas',
    visitsCount: 18,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'conexionlinguistica',
    quote: 'Que bueno poder dejar lis michis con alguien que ama los gatos y es de súper confianza',
    author: '@conexionlinguistica',
    verified: true,
    catName: 'Michis',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    date: 'Hace 41 sem.',
  },
  {
    id: '2',
    quote: 'Una genia Bren!!! Una tranquilidad saber que está ella cuidando y mimando a Platero mientras nosotros no estamos 🥰 No se estresa él y nosotros podemos disfrutar de las vacaciones. No duden en llamarla si necesitan a alguien de súper confianza 💕',
    author: '@melinataranto',
    verified: true,
    catName: 'Platero',
    avatarBg: 'bg-cyan-100 text-cyan-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '3',
    quote: '@brendacatsitter es una genia ! Cuido a lionel todos los días que me fui de vacaciones , espero poder contratarla pronto otra vez !',
    author: '@demichelisl',
    verified: true,
    catName: 'Lionel',
    avatarBg: 'bg-blue-100 text-blue-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '4',
    quote: 'Un placer que hayas cuidado y mimado a mi gato "Cristiano" .Nos has dado mucha confianza por eso he contado y mostrado tu resumen de las visitas',
    author: '@adru_baccaro',
    verified: true,
    catName: 'Cristiano',
    avatarBg: 'bg-teal-100 text-teal-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '5',
    quote: 'Sos una grosa Bren. Poder dejar a África y Killua en manos tan amorosas y confiables no tiene precio. Muchas gracias por todo ❤️',
    author: '@agostinagarcia',
    verified: true,
    catName: 'África y Killua',
    avatarBg: 'bg-sky-100 text-sky-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '6',
    quote: 'Sos una genia Bren!!!! 100% confianza!!!! Es hermosa como cuida a los gatitos! Se nota el amor que les tiene. Y Brenda como persona es un sol, tan buena y dulce!!!!! No duden en contratarla!!!',
    author: '@noelia.bacigalupo',
    verified: true,
    catName: 'Michis',
    avatarBg: 'bg-cyan-100 text-cyan-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '7',
    quote: 'Una genia Brenda! Yo le dejé mis llaves y a mis amores y confié totalmente y no me equivoqué! Volveremos a vernos Brenda!',
    author: '@carluglam',
    verified: true,
    catName: 'Mis Amores',
    avatarBg: 'bg-teal-100 text-teal-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '8',
    quote: 'Realmente es muyyyy confiable, la super recomiendo, mis michis felices !!!',
    author: '@sorayeti',
    verified: true,
    catName: 'Mis Michis',
    avatarBg: 'bg-blue-100 text-blue-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '9',
    quote: 'Una genia, super recomendable!',
    author: '@javierreymundez',
    verified: true,
    avatarBg: 'bg-sky-100 text-sky-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '10',
    quote: 'La amo, de súper confianza. 🙌',
    author: '@fanixswen',
    verified: true,
    avatarBg: 'bg-cyan-100 text-cyan-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '11',
    quote: '¡Genia total! Gracias ❤️',
    author: '@soldebernardo',
    verified: true,
    avatarBg: 'bg-teal-100 text-teal-800',
    date: 'Hace 20 sem.',
  },
  {
    id: '12',
    quote: 'Brenda es excelente. Confío plenamente en ella. La recomiendo.',
    author: '@gafiggi',
    verified: true,
    catName: 'Michis',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    date: 'Hace 28 sem.',
  },
  {
    id: '13',
    quote: 'Una genia Brenda con los michis',
    author: '@aliciscristinamonges',
    verified: true,
    catName: 'Michis',
    avatarBg: 'bg-purple-100 text-purple-800',
    date: 'Hace 86 sem.',
  },
  {
    id: '14',
    quote: 'Sos una genia. Gracias por cuidar con tanto amor a mis bebés!',
    author: '@sabmontero',
    verified: true,
    catName: 'Bebés gatunos',
    avatarBg: 'bg-pink-100 text-pink-800',
    date: 'Hace 27 sem.',
  },
  {
    id: '15',
    quote: 'Gracias por todo el amor que le das a nuestros bebés!!!',
    author: '@veronicaclaurenzi',
    verified: true,
    catName: 'Bebés',
    avatarBg: 'bg-rose-100 text-rose-800',
    date: 'Hace 39 sem.',
  },
  {
    id: '16',
    quote: 'La mejor!!! Super recomendable!!',
    author: '@marielak74',
    verified: true,
    avatarBg: 'bg-indigo-100 text-indigo-800',
    date: 'Hace 86 sem.',
  },
  {
    id: '17',
    quote: 'Nosotras que agradecemos tanto cuidado y dedicación',
    author: '@silvanafarina1',
    verified: true,
    avatarBg: 'bg-amber-100 text-amber-800',
    date: 'Hace 28 sem.',
  },
  {
    id: '18',
    quote: 'Cómo se nota tu amor Bren! Sos lo más!',
    author: '@gabriela.iribarren',
    verified: true,
    avatarBg: 'bg-teal-100 text-teal-800',
    date: 'Hace 23 sem.',
  },
  {
    id: '19',
    quote: 'Es una gran profesional ❤️😻 Sos lo massss besos mío y de Dalí😻😍',
    author: '@noemibaez1542noe',
    verified: true,
    catName: 'Dalí',
    avatarBg: 'bg-orange-100 text-orange-800',
    date: 'Hace 31 sem.',
  },
  {
    id: '20',
    quote: 'La mejor!',
    author: '@eugemorana',
    verified: true,
    avatarBg: 'bg-violet-100 text-violet-800',
    date: 'Hace 21 sem.',
  },
  {
    id: '21',
    quote: 'La mejor ❤️',
    author: '@msanchezbalducci',
    verified: true,
    avatarBg: 'bg-blue-100 text-blue-800',
    date: 'Hace 86 sem.',
  },
  {
    id: '22',
    quote: 'SOS la mejor!!!! Con mucho amor! ❤️',
    author: '@rochvc',
    verified: true,
    avatarBg: 'bg-sky-100 text-sky-800',
    date: 'Hace 3 sem.',
  },
  {
    id: '23',
    quote: 'Es excelente ❤️🐱🐱',
    author: '@huellitas.nanny',
    verified: true,
    catName: 'Michis',
    avatarBg: 'bg-cyan-100 text-cyan-800',
    date: 'Hace 81 sem.',
  },
  {
    id: '24',
    quote: 'Los gatitos se sienten muy mimados y cuidados con Brenda ❤️',
    author: '@lain77',
    verified: true,
    avatarBg: 'bg-fuchsia-100 text-fuchsia-800',
    date: 'Hace 81 sem.',
  },
];

export const SERVICE_RATES: ServiceRates = {
  duration: '45 minutos de visita dedicada',
  periodNotice: 'Tarifas por visita — vigentes hasta fin de octubre',
  weekday: '$18.000',
  saturday: '$21.000',
  sundayHoliday: '$25.000',
  interview: '$18.000',
  interviewDesc: 'Es ideal coordinar una primera visita a tu domicilio para conocernos, conocer a tu gato y saber dónde están todos sus elementos y cómo es su rutina.',
  keyHandover: 'La entrega y retiro de llaves quedan a cargo del cliente en el domicilio de Brenda en Saavedra (se pueden enviar por moto mensajería).',
  paymentTerms: '50% para congelar la reserva previo al viaje y 50% el último día de visitas.',
  cancellationPolicy: 'Solo se reintegra la seña si Brenda no pudiera asistir por fuerza mayor (ofreciendo siempre un reemplazo de confianza). No se realizan reembolsos si el cliente decide acortar el viaje o volver antes de lo pactado.',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'visit-time',
    title: 'Visita Dedicada de 45 Minutos',
    description: '45 minutos completos dedicados exclusivamente al bienestar, atención personalizada y contención afectiva de tu gato en su hogar.',
    iconName: 'Clock',
    highlight: '45 min de atención 100% enfocada',
  },
  {
    id: 'food-water',
    title: 'Alimentación y Agua Fresca',
    description: 'Reposición de plato de comida según sus porciones exactas, lavado de bebederos y agua limpia renovada en cada visita.',
    iconName: 'Utensils',
    highlight: 'Control exacto de raciones y dietas',
  },
  {
    id: 'litter',
    title: 'Higiene y Mantenimiento de Litera',
    description: 'Limpieza y juntado diario de piedras. Además, incluye limpieza profunda completa del cajón sanitario a partir del 7mo día consecutivo.',
    iconName: 'Sparkles',
    highlight: 'Limpieza profunda desde el 7mo día',
  },
  {
    id: 'play-love',
    title: 'Juego y Mimos Personalizados',
    description: 'Sesión interactiva de juegos, cañitas y mimos adaptada especialmente a la personalidad y nivel de energía de cada gato.',
    iconName: 'Heart',
    highlight: 'Adaptado al carácter de tu michi',
  },
  {
    id: 'reports',
    title: 'Fotos y Videos en Tiempo Real',
    description: 'Envío inmediato de fotos en alta calidad y videos durante la visita a través de WhatsApp para tu tranquilidad en todo momento.',
    iconName: 'Camera',
    highlight: 'Seguimiento en vivo durante cada visita',
  },
  {
    id: 'home-interview',
    title: 'Entrevista Previa en Tu Casa ($18.000)',
    description: 'Es ideal coordinar una primera visita a tu domicilio para conocernos, conocer a tu gato y saber dónde están todos sus elementos y cómo es su rutina.',
    iconName: 'Home',
    highlight: 'Coordinación y prueba de confianza',
  },
];

export const WHY_HOME_CARE = [
  {
    title: 'Cero Estrés Territorial',
    desc: 'Los gatos son animales territoriales. Quedarse en su hogar evita la ansiedad, el miedo y las descompensaciones provocadas por traslados o guarderías.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Sin Riesgo de Contagios',
    desc: 'Tu michi no entra en contacto con animales desconocidos, eliminando el riesgo de virus, pulgas o parásitos de otros gatos.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Rutinas Intactas',
    desc: 'Conserva sus lugares favoritos para dormir, sus juguetes de siempre y sus hábitos de comida exactos sin alteraciones bruscas.',
    icon: 'Clock',
  },
  {
    title: 'Presencia y Seguridad en Tu Hogar',
    desc: 'Tu casa o departamento no queda deshabitado. Brenda supervisa el entorno y deja constancia activa durante la visita.',
    icon: 'KeyRound',
  },
];

export const COVERAGE_NEIGHBORHOODS = [
  'Núñez',
  'Saavedra',
  'Belgrano',
  'Villa Urquiza',
  'Colegiales',
  'Vicente López',
];

export const FAQS: FaqItem[] = [
  {
    question: '¿Con cuánta anticipación conviene reservar las fechas?',
    answer: 'Se recomienda reservar con la mayor anticipación posible, especialmente para vacaciones de verano/invierno, feriados largos y fiestas, ya que los cupos son limitados para garantizar una atención dedicada a cada gatito.',
    category: 'general',
  },
  {
    question: '¿Qué ocurre ante una emergencia de salud durante mi ausencia?',
    answer: 'En la entrevista previa tomamos nota del veterinario de cabecera de tu gato, clínica de 24 hs cercana y un contacto de emergencia. Ante cualquier cambio de comportamiento o síntoma, te aviso al instante por WhatsApp y actuamos de inmediato.',
    category: 'seguridad',
  },
  {
    question: '¿Administrás medicación si mi gato la requiere?',
    answer: 'Sí, puedo administrar medicación oral, gotas o suplementos habituales siempre que el gatito se deje manipular sin generar un nivel alto de estrés. Lo coordinamos previamente en la entrevista inicial.',
    category: 'visitas',
  },
  {
    question: '¿Es posible coordinar dos visitas en un mismo día?',
    answer: 'Sí, dependiendo de la disponibilidad de la agenda en tus fechas, se pueden programar dos visitas diarias (por ejemplo, mañana y tarde) para gatitos que requieran acompañamiento frecuente o rutinas especiales.',
    category: 'visitas',
  },
];
