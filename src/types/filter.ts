export interface FilterCategory {
  id: string;
  name: string;
}

export interface FilterPrimaryCategory extends FilterCategory {
  subCategories?: FilterCategory[];
}
