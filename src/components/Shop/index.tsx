import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import * as R from 'ramda';
import * as React from 'react';
import * as ReactModal from 'react-modal';
import { PulseLoader } from 'react-spinners';
import ShopImg from '../../assets/images/shop.svg';
import l from '../../styles/layout';
import { colors, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import {
  OrderItemOption,
  ShopItem as ShopItemType,
  ShopOrder,
  ShopOrderItem,
} from '../../types/shop';
import { scrollToId } from '../../utils/scroll';
import { isValidEmail } from '../../utils/validation';
import Divider from '../Divider';
import Form, { FormFieldValidations } from '../Form';
import withScroll from '../hoc/withScroll';
import Newsletter from '../Newsletter';
import Catalog from './Catalog';
import ShopItem from './Item';
import OrderReview from './OrderReview';

const orderFieldValidations: FormFieldValidations<ShopOrder> = {
  agreeToTerms: (value: boolean) => value,
  customerEmail: (value: string) => isValidEmail(value),
  customerFirstName: (value: string) => !R.isEmpty(value),
  customerLastName: (value: string) => !R.isEmpty(value),
};

class OrderForm extends Form<ShopOrder> {}

interface Props {
  loading: boolean;
  inventory: ShopItemType[];
}

interface State {
  itemDetail?: ShopOrderItem;
  showOrderReview: boolean;
}

class Shop extends React.Component<Props, State> {
  targetElement: HTMLElement | null = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      itemDetail: undefined,
      showOrderReview: false,
    };
  }

  componentDidMount() {
    this.targetElement = document.querySelector('#top');
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  closeModal = () => {
    this.setState({ itemDetail: undefined });
  };

  showModal = (itemDetail: ShopOrderItem) => {
    this.setState({ itemDetail });
  };

  toggleShowOrderReview = () => {
    this.setState({ showOrderReview: !this.state.showOrderReview });
    scrollToId('shop-top');
  };

  render() {
    const { inventory, loading } = this.props;
    const { itemDetail, showOrderReview } = this.state;

    const initialValues = {
      agreeToTerms: false,
      comments: '',
      customerEmail: '',
      customerFirstName: '',
      customerLastName: '',
      date: new Date(),
      items: JSON.parse(localStorage.getItem('cart-items') || '[]'),
    };

    return (
      <div id="shop-top">
        <t.Title center pb={spacing.ml}>
          <l.FlexCentered>
            <l.Img
              height={[spacing.xxl, spacing.xxl, spacing.xxxxl]}
              mr={spacing.ml}
              src={ShopImg}
            />
            Pro Shop
          </l.FlexCentered>
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}
        >
          {loading ? (
            <l.FlexCentered>
              <l.FlexColumn>
                <PulseLoader sizeUnit="px" size={30} color={colors.black} />
                <t.Text mt={spacing.m}>Loading inventory</t.Text>
              </l.FlexColumn>
            </l.FlexCentered>
          ) : (
            <OrderForm
              errorMessage=""
              id="order-form"
              initialValues={initialValues}
              isEditing
              fieldValidations={orderFieldValidations}
              scrollId="payment-and-shipping"
              successMessage=""
              validationErrorMessage=""
            >
              {props => {
                const itemInCart =
                  !R.isNil(itemDetail) &&
                  props.fields.items.find((it: ShopItemType) =>
                    R.equals(it.id, itemDetail.id),
                  );
                return (
                  <>
                    {showOrderReview ? (
                      <OrderReview
                        {...props}
                        showModal={this.showModal}
                        toggleShowOrderReview={this.toggleShowOrderReview}
                      />
                    ) : (
                      <Catalog
                        {...props}
                        inventory={inventory}
                        showModal={this.showModal}
                        toggleShowOrderReview={this.toggleShowOrderReview}
                      />
                    )}
                    {itemDetail && (
                      <ReactModal
                        isOpen={!!itemDetail}
                        onAfterOpen={() => {
                          if (this.targetElement) {
                            disableBodyScroll(this.targetElement);
                          }
                        }}
                        onAfterClose={() => {
                          if (this.targetElement) {
                            enableBodyScroll(this.targetElement);
                          }
                        }}
                        onRequestClose={this.closeModal}
                        style={{
                          content: {
                            background: colors.background,
                            margin: '0 auto',
                            maxWidth: 550,
                          },
                          overlay: { zIndex: 1000 },
                        }}
                      >
                        <ShopItem
                          key={itemDetail.id}
                          item={itemDetail}
                          closeModal={this.closeModal}
                          showDetail
                          showDetails={this.showModal}
                          selectedOptionsInCart={
                            itemInCart ? itemInCart.selectedOptions : []
                          }
                          quantityInCart={
                            itemInCart ? itemInCart.quantity : undefined
                          }
                          updateItem={(
                            item: ShopItemType,
                            quantity: number,
                            selectedOptions: OrderItemOption[],
                          ) => {
                            let updatedItems = props.fields.items;
                            if (quantity === 0) {
                              updatedItems = R.filter(
                                (it: ShopOrderItem) =>
                                  !R.equals(it.id, item.id),
                                updatedItems,
                              );
                            } else if (
                              R.contains(item.id, R.pluck('id', updatedItems))
                            ) {
                              updatedItems = updatedItems.map(
                                (it: ShopOrderItem) =>
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
                            localStorage.setItem(
                              'cart-items',
                              JSON.stringify(updatedItems),
                            );
                            props.onChange('items', updatedItems);
                          }}
                        />
                      </ReactModal>
                    )}
                  </>
                );
              }}
            </OrderForm>
          )}
        </l.Page>
        <Newsletter />
        <l.Space height={100} />
      </div>
    );
  }
}

export default withScroll(Shop);
