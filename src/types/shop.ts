export interface ItemOptionSet {
  options: string[];
  name: string;
  id: string;
}

export interface ShopItem {
  categoryIds: string[];
  optionSets: ItemOptionSet[];
  description: string;
  hide?: boolean;
  id: string;
  imageSrcList: string[];
  isSquadLocker?: boolean;
  stockCount?: number;
  subCategoryIds?: string[];
  title: string;
  unavailableMessage?: string;
  unitCost: number;
  unitName: string;
}

export interface OrderItemOption {
  id: string;
  value: string;
}

export interface ShopOrderItem extends ShopItem {
  selectedOptions: OrderItemOption[];
  quantity: number;
}

export interface ShopOrder {
  comments: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  date: Date;
  items: ShopOrderItem[];
}
