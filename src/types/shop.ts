export interface ItemOption {
  imageSrc?: string;
  name?: string;
  value: string;
}

export interface ItemOptionSet {
  id: string;
  name: string;
  options: ItemOption[];
}

export interface ShopItem {
  categoryIds: string[];
  optionSets: ItemOptionSet[];
  description: string;
  hide?: boolean;
  id: string;
  imageSrcList: string[];
  stockCount?: number;
  subCategoryIds?: string[];
  title: string;
  unavailableMessage?: string;
  unitCost: number;
  unitName: string;
}

export interface OrderItemOption {
  id: string;
  selectedOption: ItemOption;
}

export interface ShopOrderItem extends ShopItem {
  selectedOptions: OrderItemOption[];
  quantity: number;
}

export interface ShopOrder {
  agreeToTerms: boolean;
  comments: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  date: Date;
  items: ShopOrderItem[];
}
