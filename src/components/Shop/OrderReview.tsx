import * as emailjs from 'emailjs-com';
import * as R from 'ramda';
import * as React from 'react';
import * as Sticky from 'react-stickynode';
import ShopWhiteImg from '../../assets/images/shop-white.svg';
import l from '../../styles/layout';
import { borders, breakpoints, colors, spacing, z } from '../../styles/theme';
import t from '../../styles/typography';
import { ShopOrder, ShopOrderItem } from '../../types/shop';
import { isTabletUp } from '../../utils/screensize';
import { scrollToId } from '../../utils/scroll';
import { calculateOrderTotal, getOrderItemsString } from '../../utils/shop';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import { ButtonPrimary } from '../Form/Button';
import { CheckboxRadioInputWithLabel } from '../Form/CheckboxRadio';
import { TextArea, TextInput } from '../Form/Input';
import OrderReviewItem from './OrderReviewItem';

interface Props {
  toggleShowOrderReview: () => void;
  showModal: (itemDetail: ShopOrderItem) => void;
}

class OrderReview extends React.Component<
  Props & FormComponentProps<ShopOrder>
> {
  handleSubmit = (
    onSuccess: (callback?: () => void) => void,
    onFail: (error: Error) => void,
    resetForm: () => void,
    data: any,
  ) => {
    const {
      comments,
      customerEmail,
      customerFirstName,
      customerLastName,
      errors,
      items,
    } = data;
    console.log(errors);
    if (process.env.REACT_APP_EMAILJS_KEY) {
      emailjs
        .send(
          'react_fitness_club',
          'rfc_shop_order_form',
          {
            comments: R.isEmpty(comments) ? comments : 'No comments',
            from_name: `${customerFirstName} ${customerLastName}`,
            items: getOrderItemsString(items),
            order_total: `$${calculateOrderTotal(items).toFixed(2)}`,
            reply_to: customerEmail,
          },
          process.env.REACT_APP_EMAILJS_KEY,
        )
        .then(
          () => {
            emailjs
              .send(
                'react_fitness_club',
                'rfc_order_summary',
                {
                  comments: R.isEmpty(comments) ? comments : 'No comments',
                  customer_email: customerEmail,
                  customer_first_name: customerFirstName,
                  customer_name: `${customerFirstName} ${customerLastName}`,
                  items: getOrderItemsString(items),
                  order_total: `$${calculateOrderTotal(items).toFixed(2)}`,
                },
                process.env.REACT_APP_EMAILJS_KEY,
              )
              .then(
                () => {
                  localStorage.removeItem('cart-items');
                  onSuccess(() =>
                    scrollToId('order-success', { offset: -150 }),
                  );
                },
                (error: Error) => {
                  onFail(error);
                  scrollToId(
                    R.contains('agreeToTerms', errors)
                      ? 'agree-to-terms'
                      : 'customer-info',
                    { offset: -150 },
                  );
                },
              );
          },
          (error: Error) => {
            onFail(error);
            scrollToId(
              R.contains('agreeToTerms', errors)
                ? 'agree-to-terms'
                : 'customer-info',
              { offset: -150 },
            );
          },
        );
    } else {
      console.log('Invalid emailjs key');
    }
  };

  handleUpdate = (field: keyof ShopOrder) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { onChange } = this.props;
      onChange(field, e.currentTarget.value);
    };
  };

  handleUpdateQuantity = (item: ShopOrderItem, quantity: number) => {
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
            }
          : it,
      );
    } else {
      updatedItems = R.append(
        {
          ...item,
          quantity,
        },
        updatedItems,
      );
    }
    localStorage.setItem('cart-items', JSON.stringify(updatedItems));
    onChange('items', updatedItems);
  };

  render() {
    const {
      completed,
      errors,
      failed,
      fields,
      loading,
      onChange,
      onSubmit,
      resetForm,
      toggleShowOrderReview,
      showModal,
    } = this.props;

    if (completed) {
      return (
        <l.FlexColumn id="order-success">
          <t.Text
            center
            color={colors.green}
            large
            mb={[spacing.ml, spacing.xl]}
          >
            Success! Thank you for your order.
            <l.Space height={spacing.sm} />
            We will email you when your order is available for pickup.
            <l.Space height={spacing.sm} />
            If you have any questions or need to make changes to your order,
            send us an email at{' '}
            <t.Anchor
              border={borders.green}
              color={colors.green}
              href="mailto:reactfitnessclub@gmail.com"
              large
            >
              reactfitnessclub@gmail.com
            </t.Anchor>{' '}
            or give us a call at{' '}
            <t.Anchor
              border={borders.green}
              color={colors.green}
              href="tel:7743171267"
              large
            >
              774-317-1267
            </t.Anchor>
            .
          </t.Text>
          <ButtonPrimary
            size="small"
            type="button"
            mt={[spacing.sm, spacing.m, spacing.m]}
            onClick={() => {
              resetForm();
              toggleShowOrderReview();
            }}
          >
            <l.Img height={spacing.xl} mr={spacing.sm} src={ShopWhiteImg} />
            Back to Shop
          </ButtonPrimary>
        </l.FlexColumn>
      );
    }

    return (
      <div>
        <Sticky
          enabled={isTabletUp()}
          innerZ={z.high}
          top="#nav-end"
          bottomBoundary="#review-end"
        >
          <l.Flex
            background={colors.background}
            columnOnMobile
            pb={spacing.ml}
            spaceBetween
          >
            <t.H1 mt={spacing.s}>Order Review</t.H1>
            <l.Flex mt={[spacing.ml, 0, 0]}>
              {!R.isEmpty(fields.items) && (
                <t.Text
                  color={colors.red}
                  mr={spacing.m}
                  mt={[0, spacing.m, spacing.m]}
                >
                  {fields.items.length} item{fields.items.length > 1 ? 's' : ''}{' '}
                  <l.Break breakpoint={breakpoints.mobile} />
                  for ${calculateOrderTotal(fields.items)}
                </t.Text>
              )}
              <ButtonPrimary
                size="small"
                type="button"
                mt={[0, spacing.m, spacing.m]}
                onClick={toggleShowOrderReview}
              >
                <l.Img height={spacing.xl} mr={spacing.sm} src={ShopWhiteImg} />
                Shop
              </ButtonPrimary>
            </l.Flex>
          </l.Flex>
        </Sticky>
        <l.Space height={[spacing.sm, spacing.xl, spacing.xl]} />
        <t.H2>Cart Items</t.H2>
        {isTabletUp() && (
          <>
            <l.Space height={spacing.xl} />
            <l.Flex>
              <t.Text flex={1}>Name</t.Text>
              <l.Flex>
                <t.Text width={[100, 60, 100]}>Unit</t.Text>
                <t.Text width={[100, 80, 100]}>Qty</t.Text>
                <t.Text width={[100, 60, 100]}>Total</t.Text>
                <l.Space ml={spacing.sm} width={spacing.ml} />
              </l.Flex>
            </l.Flex>
          </>
        )}
        <l.Line mt={spacing.sm} width="100%" />
        {R.isEmpty(fields.items) ? (
          <>
            <l.FlexColumn mt={spacing.xl}>
              <t.Text
                center
                color={colors.red}
                large
                mb={[spacing.ml, spacing.xl]}
              >
                You have no items in your cart.
              </t.Text>
            </l.FlexColumn>
            <div id="review-end" />
          </>
        ) : (
          <>
            {fields.items.map((item: ShopOrderItem) => (
              <OrderReviewItem
                item={item}
                key={item.id}
                showDetails={showModal}
                updateQuantity={this.handleUpdateQuantity}
              />
            ))}
            <l.Flex
              justifyContent={['center', 'flex-end', 'flex-end']}
              mt={[spacing.ml, spacing.xl, spacing.xl]}
              width="100%"
            >
              <t.Text large mr={spacing.xl}>
                Order Total:
              </t.Text>
              <t.Text bold large width={['auto', 100, 100]}>
                ${calculateOrderTotal(fields.items)}
              </t.Text>
              {isTabletUp() && <l.Space width={32} />}
            </l.Flex>
            <l.Space height={spacing.xxxxxl} />
            <t.H2>Comments or Requests:</t.H2>
            <l.Space height={spacing.xl} />
            <l.FlexColumn mx="auto" width={['100%', '90%', '80%']}>
              <t.Text large>
                If you have any special requests or notes for any of the items
                in your order, please add them below.
              </t.Text>
              <l.Space height={spacing.xl} />
              <TextArea
                error={R.contains('comments', errors)}
                height={300}
                onChange={this.handleUpdate('comments')}
                p={spacing.s}
                value={fields.comments}
                width="100%"
              />
            </l.FlexColumn>
            <l.Space height={spacing.xxxxxl} />
            <t.H2 id="payment-and-shipping">
              Payment & Shipping<l.Red>*</l.Red>:
            </t.H2>
            {!R.isEmpty(errors) && (
              <t.Text center color={colors.red} mt={spacing.xl}>
                Please correct the fields highlighted below and try again.
              </t.Text>
            )}
            <l.Space height={spacing.xl} />
            <t.Text large mx="auto" width={['100%', '90%', '80%']}>
              We will receive your order and contact you with any questions and
              an estimated order completion date.
              <l.Space height={spacing.ml} />
              Your order can be picked up at the React Fitness Club Studio
              located at:
              <l.Space height={spacing.ml} />
              173 Grove St, Worcester MA, 01605.
              <l.Space height={spacing.ml} />
              <l.Blue>
                Payment must be completed upon pickup at the studio.
              </l.Blue>
              <l.Space height={spacing.ml} />
              You will receive a copy of the order to your email once you submit
              it.
            </t.Text>
            <l.FlexCentered mt={spacing.xl}>
              <CheckboxRadioInputWithLabel
                checked={fields.agreeToTerms}
                error={R.contains('agreeToTerms', errors)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange('agreeToTerms', e.currentTarget.checked);
                }}
                text="I agree to the above terms"
                type="checkbox"
              />
            </l.FlexCentered>
            <l.Space height={spacing.xxxxxl} />
            <t.H2>
              Customer Information<l.Red>*</l.Red>:
            </t.H2>
            {!completed && failed && (
              <t.Text
                center
                color={colors.red}
                mt={spacing.xl}
                mx="auto"
                width="75%"
              >
                An error has occurred. Please try again later or email us
                directly at{' '}
                <t.Anchor
                  border={borders.red}
                  color={colors.red}
                  href="mailto:reactfitnessclub@gmail.com"
                >
                  reactfitnessclub@gmail.com
                </t.Anchor>
              </t.Text>
            )}
            <l.Space height={spacing.xl} />
            <l.Flex mx="auto" spaceBetween width={['100%', '90%', '80%']}>
              <l.Space width="48%">
                <t.HelpText mb={spacing.t}>
                  First Name<l.Red>*</l.Red>:
                </t.HelpText>
                <TextInput
                  error={R.contains('customerFirstName', errors)}
                  onChange={this.handleUpdate('customerFirstName')}
                  p={spacing.s}
                  value={fields.customerFirstName}
                  width="100%"
                />
              </l.Space>
              <l.Space width="48%">
                <t.HelpText mb={spacing.t}>
                  Last Name<l.Red>*</l.Red>:
                </t.HelpText>
                <TextInput
                  error={R.contains('customerLastName', errors)}
                  onChange={this.handleUpdate('customerLastName')}
                  p={spacing.s}
                  value={fields.customerLastName}
                  width="100%"
                />
              </l.Space>
            </l.Flex>
            <l.Space height={spacing.xl} />
            <l.Flex mx="auto" width={['100%', '90%', '80%']}>
              <l.Space width={['100%', '60%', '60%']}>
                <t.HelpText mb={spacing.t}>
                  Email Address<l.Red>*</l.Red>:
                </t.HelpText>
                <TextInput
                  error={R.contains('customerEmail', errors)}
                  onChange={this.handleUpdate('customerEmail')}
                  p={spacing.s}
                  value={fields.customerEmail}
                  width="100%"
                />
              </l.Space>
            </l.Flex>
            <l.Space height={spacing.xxxl} />
            <l.FlexCentered>
              <t.Text large mr={spacing.xxxl} width={150}>
                Total items:
              </t.Text>
              <t.Text bold large width={100}>
                {fields.items.length}
              </t.Text>
            </l.FlexCentered>
            <l.Space height={spacing.ml} />
            <l.FlexCentered>
              <t.Text large mr={spacing.xxxl} width={150}>
                Order Total:
              </t.Text>
              <t.Text bold large width={100}>
                ${calculateOrderTotal(fields.items).toFixed(2)}
              </t.Text>
            </l.FlexCentered>
            <l.Space height={spacing.l} />
            <FormActions
              forwardText="Submit Order"
              handleForward={(e: React.FormEvent) => {
                e.preventDefault();
                onSubmit(this.handleSubmit);
              }}
              loading={loading}
            />
            <l.Space height={spacing.xxxxxl} />
            <div id="review-end" />
          </>
        )}
      </div>
    );
  }
}

export default OrderReview;
