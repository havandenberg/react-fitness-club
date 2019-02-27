import { Image } from 'src/components/GalleryImage';

export interface Image {
  caption?: string;
  src: string;
  thumbnail: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
}

export interface GalleryImageData extends Image {
  categoryId: string;
  tags: string[];
  subCategoryId?: string;
}
