import { ASSETS_PATH } from '../utils/constants';

const INVENTORY_IMAGES_PATH = `${ASSETS_PATH}/shop/items`;

export const SHOP_CATEGORIES = [
  {
    id: 'rfc',
    name: 'RFC',
  },
  {
    id: 'basic-training',
    name: 'Basic Training',
  },
  {
    id: 'clothing',
    name: 'Clothing',
  },
  {
    id: 'react',
    name: 'REaCT',
  },
  {
    id: 'aikido',
    name: 'Aikido',
  },
  {
    id: 'capoeira',
    name: 'Capoeira',
  },
  // {
  //   id: 'training-weapons',
  //   name: 'Training Weapons',
  // },
];

export const defaultItem = {
  description: '',
  stockCount: 0,
  unitCost: 0,
  unitName: '',
};

export const SHOP_ITEMS = [
  // Active
  {
    categoryIds: ['react', 'clothing'],
    description: 'Main REaCT class shirt',
    id: 'react-class-uniform-shirt',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/react-tshirt-1.jpg`],
    title: 'REaCT Class Uniform T-Shirt',
  },
  {
    categoryIds: ['basic-training', 'react'],
    id: 'medical-tape',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/tape-1.jpg`],
    title: 'Sport Tape',
    unitName: 'roll',
  },
  {
    categoryIds: ['basic-training', 'react'],
    id: 'mouthguard-case',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/mouthguard-case-1.jpg`],
    title: 'Mouthguard + Case',
  },
  {
    categoryIds: ['react', 'basic-training'],
    id: 'cup-jockstrap',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/cup-jockstrap-1.jpg`],
    title: 'Cup + Jockstrap',
  },
  {
    categoryIds: ['rfc', 'clothing'],
    description:
      'Made with recycled polyester fibers from plastic bottles; Two-ply hood; Coverstitching throughout; Set-in sleeves; Rib knit waistband and cuffs; Outside ID: "C" logo at left cuff; Fabric Content - 50% cotton/50% polyester',
    id: 'rfc-hoodie',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/rfc-hoodie-1.png`],
    isSquadLocker: true,
    title: 'RFC Hoodie',
  },
  {
    categoryIds: ['rfc', 'clothing'],
    description:
      'BODY:5.0 oz.84% Polyster, 16% ELASTANE; MESH: 4.6 oz.92% POLYSTER 8% ELASTANE; HeatGear fabric, with all the benefits of UA Compression, comfortable enough to be wron all day; Stretch-mesh underarm panels deliver strategic ventilition; UPF30+protects your skin from the sun\'s harmful rays; 4-way stretch farbication allows greater mobility & maintain shape; Moisture Transport System wicks sweat awat from the body; Anti- odor technology prevents the growth of odor causing microbes; Mesh panel on back neck with ARMOUR wordmar',
    id: 'rfc-compression-shirt',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/rfc-comp-shirt-1.png`],
    isSquadLocker: true,
    title: 'RFC Short Sleeve Compression Shirt',
  },
  {
    categoryIds: ['rfc', 'clothing'],
    description:
      '9"INSEAM; 100% Polyester moisture management/antimicrobial performance fabric; Athletic cut & superior fit - Double needle hem; 2” Covered elastic waistband and drawcord; Badger heat seal logo on left hip',
    id: 'rfc-compression-shorts',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/rfc-shorts-1.png`],
    subCategoryIds: ['clothing'],
    title: 'RFC Training Shorts',
    unitName: 'pair',
  },
  {
    categoryIds: ['react', 'clothing'],
    description:
      '100% Polyester moisture management fabric; Side & underam textured waffle weave panels; Badger sport paneled shoulder for maximum movement; Front pouch pocket with two hook & loop closures at top of pockets; Adult with headset opening; Poly rib cuffs & waistband; Embriodered Badger logo on left sleeve',
    id: 'react-hoodie',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/react-hoodie-1.png`],
    isSquadLocker: true,
    title: 'REaCT Hoodie',
  },
  {
    categoryIds: ['react', 'clothing'],
    description:
      '100% Polyester moisture management fabric; Side & underam textured waffle weave panels; Badger sport paneled shoulder for maximum movement; Front pouch pocket with two hook & loop closures at top of pockets; Adult with headset opening; Poly rib cuffs & waistband; Embriodered Badger logo on left sleeve',
    id: 'react-swag-1',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/react-swag-tshirt-1.png`],
    isSquadLocker: true,
    optionSets: [
      {
        id: 'color',
        name: 'Color',
        options: ['#54759B'],
      },
    ],
    title: 'REaCT Swag T-shirt 1',
  },
  {
    categoryIds: ['react', 'clothing'],
    description:
      'UA Tech™ fabric is quick-drying, ultra-soft & has a more natural feel; Material wicks sweat & dries really fast; NEW FIT: Plus 1.5" in body length, Plus 2" across chest, Plus 2" around bottom opening. Anti-odor technology prevents the growth of odor-causing microbes; Updated set-in sleeves; Center front logo; 100% POLYESTER',
    id: 'react-compression-shirt',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/react-comp-shirt-1.png`],
    isSquadLocker: true,
    title: 'RFC Short Sleeve Compression Shirt',
  },
  {
    categoryIds: ['react', 'clothing'],
    description:
      '3.8-ounce, 100% cationic polyester interlock; PosiCharge colorfast technology; Removable tag for comfort and relabeling; Elastic waistband; 9-inch inseam; Continuous loop drawcord',
    id: 'react-compression-shorts',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/react-shorts-1.png`],
    title: 'REaCT Training Shorts',
    unitName: 'pair',
  },

  // Inactive

  {
    categoryIds: ['aikido', 'training-weapons'],
    id: 'aikido-bokken',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/bokken-1.jpg`],
    title: 'Bokken',
  },
  {
    categoryIds: ['aikido', 'clothing'],
    id: 'aikido-kimono',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/hakama-1.jpg`],
    title: 'Aikido Kimono',
  },
  {
    categoryIds: ['capoeira'],
    id: 'capoeira-berimbau',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/berimbau-1.jpg`],
    subCategoryIds: ['musical-instruments'],
    title: 'Berimbau',
  },
  {
    categoryIds: ['capoeira'],
    id: 'capoeira-uniform-combo',
    subCategoryIds: ['clothing'],
    title: 'Uniform Combo',
  },
  {
    categoryIds: ['capoeira'],
    id: 'capoeira-uniform-pants',
    subCategoryIds: ['clothing'],
    title: 'Uniform Pants',
  },
  {
    categoryIds: ['capoeira'],
    id: 'capoeira-uniform-shirt',
    subCategoryIds: ['clothing'],
    title: 'Uniform Shirt',
  },
  {
    categoryIds: ['react'],
    id: 'hand-wraps',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/wraps-1.jpg`],
    optionSets: [
      {
        id: 'color',
        name: 'Color',
        options: ['red', 'blue', 'black', 'white', 'green'],
      },
    ],
    subCategoryIds: ['training-gear'],
    title: 'Handwraps',
    unitName: 'pair',
  },
  {
    categoryIds: ['react'],
    id: 'react-big-gloves',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/gloves-16oz-1.jpg`],
    optionSets: [
      {
        id: 'color',
        name: 'Color',
        options: ['black', 'pink', 'green'],
      },
      {
        id: 'size',
        name: 'Size',
        options: ['8 oz', '10 oz', '12 oz', '14 oz', '16 oz', '18oz'],
      },
    ],
    subCategoryIds: ['training-gear'],
    title: 'Sanabul Essential Gel Boxing Kickboxing Training Gloves',
    unitName: 'pair',
  },
  {
    categoryIds: ['react'],
    id: 'react-headgear',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/headgear-1.jpg`],
    subCategoryIds: ['training-gear'],
    title: 'Headgear',
  },
  {
    categoryIds: ['react'],
    id: 'react-shin-pads',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/shin-pads-1.jpg`],
    subCategoryIds: ['training-gear'],
    title: 'Shin Pads',
    unitName: 'pair',
  },
  {
    categoryIds: ['react'],
    id: 'react-small-gloves',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/grappling-gloves-1.jpg`],
    subCategoryIds: ['training-gear'],
    title: 'MMA/Grappling gloves',
    unitName: 'pair',
  },
  {
    categoryIds: ['rfc-general'],
    id: 'rfc-manager-polo',
    imageSrcList: [`${INVENTORY_IMAGES_PATH}/rfc-manager-polo-1.png`],
    subCategoryIds: ['clothing'],
    title: 'RFC Manager Polo',
  },
];
