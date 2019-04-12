import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { isMobileOnly } from 'src/utils/screensize';
import PlaceholderImg from '../../assets/images/item-placeholder.jpg';
import RemoveImg from '../../assets/images/remove.svg';
import l from '../../styles/layout';
import { borders, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { OrderItemOption, ShopItem, ShopOrderItem } from '../../types/shop';
import { calculateItemTotal } from '../../utils/shop';
import { TextInput } from '../Form/Input';
import { getOptionComponent } from './ItemOptionSet';

const ItemWrapper = styled(l.Flex)({
  borderBottom: borders.gray,
});

const ImageWrapper = styled(l.Space)({
  cursor: 'pointer',
});

interface Props {
  item: ShopOrderItem;
  showDetails: (itemDetail: ShopItem) => void;
  updateQuantity: (item: ShopOrderItem, quantity: number | '') => void;
}

class OrderReviewItem extends React.Component<Props> {
  handleBlur = () => {
    const { item, updateQuantity } = this.props;
    if (R.equals(item.quantity, NaN) || item.quantity === 0) {
      updateQuantity(item, 1);
    }
  };

  handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { item, updateQuantity } = this.props;
    const quantity = parseInt(e.target.value, 10);
    if (
      (R.equals(quantity, NaN) || quantity > 0) &&
      (item.stockCount ? quantity <= item.stockCount : true)
    ) {
      updateQuantity(item, quantity);
    }
  };

  render() {
    const { item, showDetails } = this.props;

    const primaryImgSrc =
      item.imageSrcList &&
      !R.isEmpty(item.imageSrcList) &&
      item.imageSrcList[0];

    return (
      <ItemWrapper py={[spacing.ml, spacing.m, spacing.m]}>
        <ImageWrapper
          mr={[spacing.ml, spacing.xl, spacing.xl]}
          onClick={() => showDetails(item)}>
          <l.Img
            src={primaryImgSrc ? primaryImgSrc : PlaceholderImg}
            width={80}
          />
        </ImageWrapper>
        <l.Flex alignTop={isMobileOnly()} columnOnMobile flex={1}>
          <l.Flex flex={[1, '65%', '65%']}>
            <div>
              <ImageWrapper onClick={() => showDetails(item)}>
                <t.Text flex={1} large>
                  {item.title}
                </t.Text>
              </ImageWrapper>
              {!R.isEmpty(item.selectedOptions) && (
                <l.Flex mt={spacing.sm}>
                  {item.selectedOptions.map(
                    (option: OrderItemOption, idx: number) => (
                      <l.Space key={idx} mr={spacing.sm}>
                        {getOptionComponent(option.id, option.value, false)}
                      </l.Space>
                    ),
                  )}
                </l.Flex>
              )}
            </div>
          </l.Flex>
          <l.Flex
            alignTop={isMobileOnly()}
            mt={[spacing.m, 0, 0]}
            width={['100%', 'auto', 'auto']}>
            <l.Space width={['auto', 60, 100]}>
              {isMobileOnly() && <t.HelpText mb={spacing.t}>Unit</t.HelpText>}
              <t.Text large mt={[spacing.m, 0, 0]}>
                ${item.unitCost}
              </t.Text>
            </l.Space>
            <l.Space ml={[spacing.ml, 0, 0]} width={[60, 80, 100]}>
              {isMobileOnly() && <t.HelpText mb={spacing.t}>Qty</t.HelpText>}
              <TextInput
                textAlign="center"
                onBlur={this.handleBlur}
                onChange={this.handleQuantityChange}
                mr={[0, spacing.sm, spacing.sm]}
                p={[0, spacing.t, spacing.t]}
                type="number"
                value={R.equals(item.quantity, NaN) ? '' : item.quantity}
                width={60}
              />
            </l.Space>
            <l.Space ml={[spacing.ml, 0, 0]} width={['auto', 60, 100]}>
              {isMobileOnly() && <t.HelpText mb={spacing.t}>Total</t.HelpText>}
              <t.Text large mt={[spacing.m, 0, 0]}>
                ${calculateItemTotal(item)}
              </t.Text>
            </l.Space>
          </l.Flex>
        </l.Flex>
        <t.TextButton
          ml={spacing.sm}
          onClick={() => {
            this.props.updateQuantity(item, 0);
          }}>
          <l.Img height={spacing.ml} src={RemoveImg} width={spacing.ml} />
        </t.TextButton>
      </ItemWrapper>
    );
  }
}

export default OrderReviewItem;
