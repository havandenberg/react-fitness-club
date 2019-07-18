import * as R from 'ramda';
import PlaceholderImg from '../assets/images/item-placeholder.jpg';
import { defaultItem, SHOP_ITEMS } from '../content/shop';
import {
  ItemOption,
  ItemOptionSet,
  OrderItemOption,
  ShopItem,
  ShopOrderItem,
} from '../types/shop';

export const parseInventory = (inventory: ShopItem[]) =>
  SHOP_ITEMS.map((itemContent: Partial<ShopItem>) => {
    const item = inventory[`${itemContent.id}`] || {};
    return {
      ...defaultItem,
      ...itemContent,
      ...item,
    };
  });

export const calculateItemTotal = (item: ShopOrderItem) =>
  R.equals(item.quantity, NaN)
    ? item.unitCost
    : item.unitCost * parseInt(`${item.quantity}`, 10);

export const calculateOrderTotal = (items: ShopOrderItem[]) =>
  R.reduce((total, item) => total + calculateItemTotal(item), 0, items);

export const getOrderItemsString = (items: ShopOrderItem[]) =>
  R.reduce(
    (orderString, item) =>
      orderString +
      `${item.id}: ${item.quantity} - $${calculateItemTotal(item).toFixed(2)}${
        R.isEmpty(item.selectedOptions)
          ? ''
          : item.selectedOptions.map(
              (opt: OrderItemOption) =>
                `, ${opt.id}: ${opt.selectedOption.value}`,
            )
      }<br />`,
    '',
    items,
  );

export const getItemImageSrcList = (item: ShopItem) => {
  const itemOptionList: any = item.optionSets
    ? R.flatten(
        item.optionSets.map((optionSet: ItemOptionSet) =>
          R.reduce(
            (imageList: string[], option: ItemOption) =>
              option.imageSrc ? imageList.concat(option.imageSrc) : imageList,
            [],
            optionSet.options,
          ),
        ),
      )
    : [];
  return R.uniq(item.imageSrcList.concat(itemOptionList));
};

export const getActiveImageSrc = (
  item: ShopItem,
  selectedOptions: OrderItemOption[],
  lastSelectedImg?: string | null,
  hoverOption?: string | null,
) => {
  if (hoverOption) {
    return hoverOption;
  }
  if (lastSelectedImg) {
    return lastSelectedImg;
  }
  const selectedOptionList = R.map(
    (itemOption: ItemOption) => itemOption.imageSrc,
    R.map((option: OrderItemOption) => option.selectedOption, selectedOptions),
  )
    .concat(item.imageSrcList)
    .filter(Boolean);
  if (!R.isEmpty(selectedOptionList)) {
    return R.head(selectedOptionList);
  }
  return PlaceholderImg;
};
