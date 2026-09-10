import type { CatClient } from './catData';

const OLD_COMMIT = '58a52be782051e3ce3ccc857c81af02103f92c6e';
const RAW = `https://raw.githubusercontent.com/polizelener-droid/brendacatsitter/${OLD_COMMIT}/src/assets/images/`;

export const RECOVERED_CATS: CatClient[] = [
  { id: 'africa-y-killua', name: 'África y Killua', owner: 'Familia África y Killua', image: `${RAW}cat_africa_killua_1785260539813.jpg`, story: '', personality: [], favoriteActivity: '', visitsCount: 0 },
  { id: 'lionel', name: 'Lionel', owner: 'Familia Lionel', image: `${RAW}cat_lionel_1785260505624.jpg`, story: '', personality: [], favoriteActivity: '', visitsCount: 0 },
  { id: 'jingle', name: 'Jingle', owner: 'Familia Jingle', image: `${RAW}cat_jingle_1785293731808.jpg`, story: '', personality: [], favoriteActivity: '', visitsCount: 0 },
  { id: 'flash-y-cloe', name: 'Flash y Cloe', owner: 'Familia Flash y Cloe', image: `${RAW}cat_flash_cloe_1785293197055.jpg`, story: '', personality: [], favoriteActivity: '', visitsCount: 0 },
  { id: 'tita', name: 'Tita', owner: 'Familia Tita', image: `${RAW}cat_tita_1785293187138.jpg`, story: '', personality: [], favoriteActivity: '', visitsCount: 0 },
  { id: 'uli', name: 'Uli', owner: 'Familia Uli', image: `${RAW}cat_uli_photo_1785334346940.jpg`, story: '', personality: [], favoriteActivity: '', visitsCount: 0 },
  { id: 'una', name: 'Una', owner: 'Familia Una', image: `${RAW}cat_una_photo_1785332514378.jpg`, story: '', personality: [], favoriteActivity: '', visitsCount: 0 },
  { id: 'platero', name: 'Platero', owner: 'Familia Platero', image: `${RAW}cat_platero_1785260516733.jpg`, story: '', personality: [], favoriteActivity: '', visitsCount: 0 },
];
