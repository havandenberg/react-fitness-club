import * as R from 'ramda';
import * as React from 'react';
import { calculateOrderTotal } from 'src/utils/shop';
import ShopImg from '../../assets/images/cart.svg';
import { SHOP_CATEGORIES } from '../../content/shop';
import l from '../../styles/layout';
import { colors, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { FilterPrimaryCategory } from '../../types/filter';
import {
  OrderItemOption,
  ShopItem as ShopItemType,
  ShopOrder,
  ShopOrderItem,
} from '../../types/shop';
import { isMobileOnly } from '../../utils/screensize';
import FilterBar from '../FilterBar';
import { FormComponentProps } from '../Form';
import { ButtonPrimary } from '../Form/Button';
import Grid from '../Grid';
import ShopItem from './Item';

interface Props {
  inventory: ShopItemType[];
  toggleShowOrderReview: () => void;
  showModal: (itemDetail: ShopItemType) => void;
}

class ShopCatalog extends React.Component<
  Props & FormComponentProps<ShopOrder>
> {
  filterInventory = (
    searchValue: string,
    categoryId: string,
    subCategoryId: string,
  ) => {
    const { inventory } = this.props;
    // const sortedInventory: ShopItemType[] = R.sortBy(
    //   (item: ShopItemType) =>
    //     R.isEmpty(item.categoryIds) ? 'zzzzz' : item.categoryIds[0],
    //   inventory,
    // );
    return inventory.filter((item: ShopItemType) => {
      const isValidCategory =
        R.equals(categoryId, 'all') || R.contains(categoryId, item.categoryIds);
      const isValidSubCategory =
        R.equals(subCategoryId, 'all') ||
        (item.subCategoryIds && R.contains(subCategoryId, item.subCategoryIds));
      const values = R.values(R.pick(['title', 'description'], item)).concat([
        JSON.stringify(item.categoryIds),
        item.subCategoryIds ? JSON.stringify(item.subCategoryIds) : '',
      ]);

      return (
        !item.hide &&
        isValidCategory &&
        isValidSubCategory &&
        R.reduce(
          (containsSearchValue: boolean, value: string) => {
            return (
              containsSearchValue ||
              (value
                ? R.contains(searchValue.toLowerCase(), value.toLowerCase())
                : false)
            );
          },
          false,
          values,
        )
      );
    });
  };

  handleUpdateItem = (
    item: ShopItemType,
    quantity: number,
    selectedOptions: OrderItemOption[],
  ) => {
    const { fields, onChange } = this.props;

    let updatedItems = fields.items;
    if (quantity === 0) {
      updatedItems = R.filter(
        (it: ShopOrderItem) => !R.equals(it.id, item.id),
        updatedItems,
      );
    } else if (R.contains(item.id, R.pluck('id', updatedItems))) {
      updatedItems = updatedItems.map((it: ShopOrderItem) =>
        R.equals(item.id, it.id)
          ? {
              ...it,
              quantity,
              selectedOptions,
            }
          : it,
      );
    } else {
      updatedItems = R.append(
        {
          ...item,
          quantity,
          selectedOptions,
        },
        updatedItems,
      );
    }
    localStorage.setItem('cart-items', JSON.stringify(updatedItems));
    onChange('items', updatedItems);
  };

  render() {
    const { fields, showModal, toggleShowOrderReview } = this.props;

    const sortedCategories = R.sortBy(
      (category: FilterPrimaryCategory) => category.name,
      SHOP_CATEGORIES,
    );

    return (
      <div>
        <FilterBar
          categories={sortedCategories}
          categoryLabel="Category:"
          legend={
            <l.Flex mt={[spacing.sm, 0, 0]}>
              {!R.isEmpty(fields.items) && (
                <t.Text
                  color={colors.red}
                  mr={spacing.m}
                  mt={[spacing.sm, 0, 0]}
                  textAlign="right">
                  {fields.items.length} item{fields.items.length > 1 ? 's' : ''}{' '}
                  for ${calculateOrderTotal(fields.items)}
                </t.Text>
              )}
              <ButtonPrimary
                mt={[spacing.sm, 0, 0]}
                size="small"
                type="button"
                onClick={toggleShowOrderReview}>
                <l.Img height={spacing.xl} mr={spacing.sm} src={ShopImg} />
                Cart
              </ButtonPrimary>
            </l.Flex>
          }
          legendOnBottom
          subCategoryLabel="Subcategory:"
          searchLabel="Search Pro Shop:"
          scrollEndId="#shop-end">
          {({ searchValue, categoryId, subCategoryId }) => {
            const filteredInventory = this.filterInventory(
              searchValue,
              categoryId,
              subCategoryId,
            );
            return (
              <>
                <l.Flex mt={[spacing.sm, spacing.sm, spacing.xl]}>
                  <l.Flex spaceBetween={isMobileOnly()} width="100%">
                    <t.H2>Catalog Items</t.H2>
                    <l.Space width={spacing.xl} />
                    <t.Text flex={1}>{filteredInventory.length} items</t.Text>
                  </l.Flex>
                </l.Flex>
                <Grid
                  alignTop
                  id="shop-grid"
                  itemWidth={isMobileOnly() ? '45%' : '30%'}
                  maxColumns={isMobileOnly() ? 2 : 3}
                  customStyles={{ mt: spacing.xl }}>
                  {filteredInventory.map((item: ShopItemType) => {
                    const itemInCart = fields.items.find((it: ShopItemType) =>
                      R.equals(it.id, item.id),
                    );
                    return (
                      <ShopItem
                        item={item}
                        key={item.id}
                        selectedOptionsInCart={
                          itemInCart ? itemInCart.selectedOptions : []
                        }
                        showDetails={showModal}
                        quantityInCart={
                          itemInCart ? itemInCart.quantity : undefined
                        }
                        updateItem={this.handleUpdateItem}
                      />
                    );
                  })}
                </Grid>
              </>
            );
          }}
        </FilterBar>
        <div id="shop-end" />
      </div>
    );
  }
}

export default ShopCatalog;
