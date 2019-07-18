import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import ModalCloseImg from '../../assets/images/modal-close-dark.svg';
import l from '../../styles/layout';
import { breakpoints, colors, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import {
  ItemOption,
  ItemOptionSet as ItemOptionSetType,
  OrderItemOption,
  ShopItem as ShopItemType,
} from '../../types/shop';
import { isMobileOnly, isSmall } from '../../utils/screensize';
import { getActiveImageSrc, getItemImageSrcList } from '../../utils/shop';
import { ButtonPrimary } from '../Form/Button';
import { TextInput } from '../Form/Input';
import ItemOptionSet, { getOptionComponent } from './ItemOptionSet';

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
  hoverOptionSrc: string | null;
  lastSelectedOptionSrc: string | null;
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
            selectedOption: optionSet.options[0],
          }))
        : [];
    this.state = {
      hoverOptionSrc: null,
      lastSelectedOptionSrc: null,
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

  handleOptionChange = (id: string, newValue: ItemOption) => {
    const { lastSelectedOptionSrc, selectedOptions } = this.state;
    const selectedOption = selectedOptions.find(
      (orderOption: OrderItemOption) => R.equals(orderOption.id, id),
    );
    const newOptions = selectedOption
      ? selectedOptions.map((orderOption: OrderItemOption) =>
          R.equals(orderOption.id, id)
            ? { ...orderOption, selectedOption: newValue }
            : orderOption,
        )
      : [...selectedOptions, { id, selectedOption: newValue }];
    console.log(newOptions);
    this.setState({
      lastSelectedOptionSrc: newValue.imageSrc
        ? newValue.imageSrc
        : lastSelectedOptionSrc,
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

  setHoverOptionSrc = (hoverOptionSrc: string | null) => {
    this.setState({ hoverOptionSrc });
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
    const {
      hoverOptionSrc,
      lastSelectedOptionSrc,
      quantity,
      selectedOptions,
    } = this.state;

    const activeImgSrc = getActiveImageSrc(
      item,
      selectedOptions,
      lastSelectedOptionSrc,
      hoverOptionSrc,
    );

    const isDirty =
      !R.equals(quantity, quantityInCart) ||
      !R.equals(selectedOptions, selectedOptionsInCart);

    const ItemComponent = showDetail ? l.Scroll : l.Space;

    const imageSrcList = getItemImageSrcList(item);

    return (
      <ItemComponent
        height="100%"
        mb={showDetail ? 0 : spacing.xxxl}
        position="relative"
        width="100%">
        <ImageWrapper height={isSmall() ? 125 : [150, 300, 300]}>
          <l.CursorPointerWrapper showPointer={showDetail}>
            <l.Img
              cursor={showDetail ? 'default' : 'pointer'}
              maxHeight={isSmall() ? 125 : [150, 300, 300]}
              mb={spacing.s}
              onClick={showDetail ? undefined : () => showDetails(item)}
              src={activeImgSrc}
              width={showDetail ? undefined : '100%'}
            />
          </l.CursorPointerWrapper>
        </ImageWrapper>
        {imageSrcList.length > 1 && (
          <l.ScrollFlex
            mb={spacing.ml}
            mx="auto"
            width={
              showDetail
                ? isSmall()
                  ? 180
                  : [220, 450, 450]
                : isSmall()
                ? 125
                : [150, 200, 280]
            }>
            {imageSrcList.map((imageSrc: string, index: number) => (
              <React.Fragment key={index}>
                {getOptionComponent(
                  'image',
                  { imageSrc, value: imageSrc },
                  false,
                  this.handleOptionChange,
                  this.setHoverOptionSrc,
                )}
              </React.Fragment>
            ))}
          </l.ScrollFlex>
        )}
        <l.CursorPointerWrapper showPointer={showDetail}>
          <t.Text
            center
            large
            onClick={showDetail ? undefined : () => showDetails(item)}>
            {item.title}
          </t.Text>
        </l.CursorPointerWrapper>
        <l.FlexColumn>
          <l.Space mt={item.optionSets ? spacing.ml : 0}>
            {item.optionSets &&
              item.optionSets.map(
                (optionSet: ItemOptionSetType, idx: number) => {
                  const selectedOption = selectedOptions.find(
                    (opt: OrderItemOption) => R.equals(opt.id, optionSet.id),
                  );
                  return (
                    <React.Fragment key={optionSet.id}>
                      <ItemOptionSet
                        fullWidth={showDetail}
                        option={optionSet}
                        selectedOption={selectedOption}
                        setHoverOptionSrc={this.setHoverOptionSrc}
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
                <l.Space mr={spacing.xl}>
                  <t.HelpText mb={spacing.s}>Price:</t.HelpText>
                  <t.Text large mb={spacing.t}>
                    ${item.unitCost * (parseInt(`${quantity}`, 10) || 1)}
                  </t.Text>
                </l.Space>
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
              </l.FlexCentered>
              <l.FlexCentered columnOnMobile>
                {quantityInCart && (
                  <>
                    <t.Text bold color={colors.red} textAlign="right">
                      In Cart: {quantityInCart}
                    </t.Text>
                    <l.Space
                      height={spacing.sm}
                      width={[spacing.sm, spacing.m, spacing.l]}
                    />
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
            </div>
          )}
        </l.FlexColumn>
        {showDetail && !R.isEmpty(item.description) && (
          <>
            <t.Text mb={spacing.ml} mt={spacing.xl}>
              Item details:
            </t.Text>
            <t.Text>{item.description}</t.Text>
          </>
        )}
        {closeModal && <CloseButton onClick={closeModal} src={ModalCloseImg} />}
      </ItemComponent>
    );
  }
}

export default ShopItem;
