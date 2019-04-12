import * as R from 'ramda';
import { defaultItem, SHOP_ITEMS } from '../content/shop';
import { OrderItemOption, ShopItem, ShopOrderItem } from '../types/shop';

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
              (opt: OrderItemOption) => `, ${opt.id}: ${opt.value}`,
            )
      }<br />`,
    '',
    items,
  );
