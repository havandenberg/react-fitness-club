import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import PlaceholderImg from '../../assets/images/item-placeholder.jpg';
import ModalCloseImg from '../../assets/images/modal-close-dark.svg';
import l from '../../styles/layout';
import { breakpoints, colors, gradients, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import {
  ItemOptionSet as ItemOptionSetType,
  OrderItemOption,
  ShopItem as ShopItemType,
} from '../../types/shop';
import { SQUADLOCKER_PATH } from '../../utils/constants';
import { isMobileOnly, isTabletUp } from '../../utils/screensize';
import { ButtonPrimary } from '../Form/Button';
import { TextInput } from '../Form/Input';
import ItemOptionSet from './ItemOptionSet';

export const CloseButton = styled(l.Img)({
  cursor: 'pointer',
  height: spacing.ml,
  position: 'absolute',
  right: 0,
  top: 0,
  width: spacing.ml,
});

const ImageWrapper = styled(l.FlexCentered)(
  {
    flexDirection: 'column',
  },
  ({ onClick }: { onClick?: (itemDetail: ShopItemType) => void }) => ({
    cursor: onClick ? 'pointer' : 'default',
  }),
);

const QuantityInput = styled(TextInput)({
  [breakpoints.mobile]: {
    width: spacing.xxxl,
  },
});

interface Props {
  closeModal?: () => void;
  quantityInCart?: number;
  selectedOptionsInCart?: OrderItemOption[];
  showDetail?: boolean;
  showDetails: (itemDetail: ShopItemType) => void;
  item: ShopItemType;
  updateItem: (
    item: ShopItemType,
    quantity: number | '',
    selectedOptions: OrderItemOption[],
  ) => void;
}

interface State {
  quantity: number | '';
  selectedOptions: OrderItemOption[];
}

class ShopItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { item, quantityInCart, selectedOptionsInCart } = this.props;
    const selectedOptions =
      selectedOptionsInCart && !R.isEmpty(selectedOptionsInCart)
        ? selectedOptionsInCart
        : item.optionSets
        ? item.optionSets.map((optionSet: ItemOptionSetType) => ({
            id: optionSet.id,
            value: optionSet.options[0],
          }))
        : [];
    this.state = {
      quantity: quantityInCart ? quantityInCart : 1,
      selectedOptions,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const nextSelOptInCart = nextProps.selectedOptionsInCart;
    const selOptInCart = this.props.selectedOptionsInCart;
    const nextQtyInCart = nextProps.quantityInCart;
    const qtyInCart = this.props.quantityInCart;
    const { quantity, selectedOptions } = this.state;
    if (
      !R.equals(nextSelOptInCart, selOptInCart) ||
      !R.equals(nextQtyInCart, qtyInCart)
    ) {
      this.setState({
        quantity: nextQtyInCart ? nextQtyInCart : quantity,
        selectedOptions: nextSelOptInCart ? nextSelOptInCart : selectedOptions,
      });
    }
  }

  handleBlur = () => {
    if (R.equals(this.state.quantity, NaN) || this.state.quantity === 0) {
      this.setState({ quantity: 1 });
    }
  };

  handleOptionChange = (id: string, newValue: string) => {
    const { selectedOptions } = this.state;
    const selectedOption = selectedOptions.find(
      (orderOption: OrderItemOption) => R.equals(orderOption.id, id),
    );
    const newOptions = selectedOption
      ? selectedOptions.map((orderOption: OrderItemOption) =>
          R.equals(orderOption.id, id)
            ? { ...orderOption, value: newValue }
            : orderOption,
        )
      : [...selectedOptions, { id, value: newValue }];
    this.setState({
      selectedOptions: newOptions,
    });
  };

  handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { item } = this.props;
    const quantity = parseInt(e.target.value, 10);
    if (
      (R.equals(quantity, NaN) || quantity > 0) &&
      (item.stockCount ? quantity <= item.stockCount : true)
    ) {
      this.setState({ quantity });
    }
  };

  render() {
    const {
      closeModal,
      item,
      quantityInCart,
      selectedOptionsInCart,
      showDetail,
      showDetails,
    } = this.props;
    const { quantity, selectedOptions } = this.state;

    const primaryImgSrc =
      item.imageSrcList &&
      !R.isEmpty(item.imageSrcList) &&
      item.imageSrcList[0];

    const isDirty =
      !R.equals(quantity, quantityInCart) ||
      !R.equals(selectedOptions, selectedOptionsInCart);

    return (
      <l.ScrollFlex
        flexDirection="column"
        showScrollBar={false}
        height="100%"
        mb={showDetail ? 0 : spacing.xxxl}
        position="relative"
        width="100%">
        <ImageWrapper
          onClick={showDetail ? undefined : () => showDetails(item)}
          width="100%">
          <l.Img
            maxHeight={300}
            mb={spacing.ml}
            src={primaryImgSrc ? primaryImgSrc : PlaceholderImg}
            width={[showDetail ? 'auto' : '100%']}
          />
          <t.Text center large>
            {item.title}
          </t.Text>
        </ImageWrapper>
        <l.FlexCentered
          flexDirection={showDetail ? 'row' : 'column'}
          width="100%">
          <l.Space
            mr={item.optionSets && showDetail ? spacing.xxxl : 0}
            mt={item.optionSets ? spacing.ml : 0}>
            {item.optionSets &&
              item.optionSets.map(
                (optionSet: ItemOptionSetType, idx: number) => {
                  const selectedOption = selectedOptions.find(
                    (opt: OrderItemOption) => R.equals(opt.id, optionSet.id),
                  );
                  return (
                    <React.Fragment key={optionSet.id}>
                      <ItemOptionSet
                        option={optionSet}
                        selectedOption={selectedOption}
                        updateOption={this.handleOptionChange}
                      />
                      {idx < item.optionSets.length - 1 && (
                        <l.Space height={spacing.m} />
                      )}
                    </React.Fragment>
                  );
                },
              )}
          </l.Space>
          {item.unavailableMessage ? (
            <l.FlexCentered mt={spacing.ml} mx="auto" width="80%">
              <t.Text center={isMobileOnly()} color={colors.red}>
                {item.unavailableMessage}
              </t.Text>
            </l.FlexCentered>
          ) : (
            <div>
              <l.FlexCentered alignTop my={spacing.ml}>
                <l.Space mr={!item.isSquadLocker ? spacing.xl : undefined}>
                  <t.HelpText mb={spacing.s}>Price:</t.HelpText>
                  <t.Text large mb={spacing.t}>
                    ${item.unitCost * (parseInt(`${quantity}`, 10) || 1)}
                  </t.Text>
                </l.Space>
                {!item.isSquadLocker && (
                  <div>
                    <t.HelpText mb={spacing.t}>Quantity:</t.HelpText>
                    <QuantityInput
                      textAlign="center"
                      onBlur={this.handleBlur}
                      onChange={this.handleQuantityChange}
                      p={spacing.t}
                      type="number"
                      value={R.equals(quantity, NaN) ? '' : quantity}
                      width={[spacing.xl, spacing.xxxxl, spacing.xxxxl]}
                    />
                  </div>
                )}
              </l.FlexCentered>
              {item.isSquadLocker && (
                <l.FlexCentered>
                  <t.Anchor href={SQUADLOCKER_PATH} target="_blank">
                    <ButtonPrimary
                      background={colors.green}
                      gradient={gradients.green}
                      size="small"
                      type="button">
                      {isTabletUp() ? 'Shop on ' : ''}SquadLocker
                    </ButtonPrimary>
                  </t.Anchor>
                </l.FlexCentered>
              )}
              {!item.isSquadLocker && (
                <l.FlexCentered columnOnMobile>
                  {quantityInCart && (
                    <>
                      <t.Text bold color={colors.red}>
                        In Cart: {quantityInCart}
                      </t.Text>
                      <l.Space height={spacing.sm} width={spacing.xl} />
                    </>
                  )}
                  <ButtonPrimary
                    onClick={() => {
                      if ((quantityInCart && isDirty) || !quantityInCart) {
                        this.props.updateItem(item, quantity, selectedOptions);
                      } else if (quantityInCart && !isDirty) {
                        this.props.updateItem(item, 0, selectedOptions);
                        this.setState({ quantity: 1 });
                      }
                    }}
                    type="button"
                    size="small"
                    width={105}>
                    {quantityInCart
                      ? isDirty
                        ? 'Update'
                        : 'Remove'
                      : 'Add to Cart'}
                  </ButtonPrimary>
                </l.FlexCentered>
              )}
            </div>
          )}
        </l.FlexCentered>
        {showDetail && <t.Text mt={spacing.xl}>{item.description}</t.Text>}
        {closeModal && <CloseButton onClick={closeModal} src={ModalCloseImg} />}
      </l.ScrollFlex>
    );
  }
}

export default ShopItem;
