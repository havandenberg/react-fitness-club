import {
  BlobProvider,
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { blobToBase64String } from 'blob-util';
import * as emailjs from 'emailjs-com';
import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import {
  clauseFive,
  clauseFour,
  clauseOne,
  clauseSix,
  clauseThree,
  clauseTwo,
  intro,
  lastSection,
  parentRelease,
  title,
  typedSection,
} from '../../content/liability';
import l from '../../styles/layout';
import { borders, breakpoints, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { scrollToId } from '../../utils/scroll';
import { isUnderEighteen } from '../../utils/validation';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import { CheckboxRadioInputWithLabel } from '../Form/CheckboxRadio';
import { TextInput } from '../Form/Input';
import { SetupFields } from './';

export const LIABILITY_WAIVER = 'Liability Waiver';

const InitialInput = styled(TextInput)({
  width: spacing.xxxxl,
  [breakpoints.tablet]: {
    width: spacing.xxxxl,
  },
  [breakpoints.mobile]: {
    width: spacing.xxxxl,
  },
});

const liabilityStyles = StyleSheet.create({
  initials: {
    fontSize: 10,
    marginBottom: spacing.s,
    marginHorizontal: spacing.xxl,
    textAlign: 'right',
  },
  intro: {
    marginBottom: spacing.sm,
    marginHorizontal: spacing.xxl,
  },
  introText: { fontSize: 12 },
  last: {
    marginBottom: spacing.ml,
    marginHorizontal: spacing.xxl,
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.ml,
    marginHorizontal: spacing.xxl,
  },
  signature: {
    fontSize: 16,
  },
  signatureLabelLeft: {
    fontSize: 10,
    marginBottom: spacing.s,
    width: '40%',
  },
  signatureLabelRight: {
    fontSize: 10,
    marginBottom: spacing.s,
  },
  signatureRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: spacing.xxl,
  },
  text: { fontSize: 12, width: '90%' },
  titleWrapper: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: spacing.ml,
    marginTop: spacing.xxxl,
  },
});

interface Props {
  handleSuccess: () => void;
}

class LiabilityWaiverStep extends React.Component<
  Props & FormComponentProps<SetupFields>
> {
  generatePDF = () => {
    const { fields } = this.props;
    return (
      <Document>
        <Page size="A4">
          <View style={liabilityStyles.titleWrapper}>
            <Text>{title}</Text>
          </View>
          <View style={liabilityStyles.intro}>
            <Text style={liabilityStyles.introText}>{intro}</Text>
          </View>
          <Text style={liabilityStyles.initials}>Initials</Text>
          <View style={liabilityStyles.row}>
            <Text style={liabilityStyles.text}>{clauseOne}</Text>
            <Text>{fields.initialOne}</Text>
          </View>
          <View style={liabilityStyles.row}>
            <Text style={liabilityStyles.text}>{clauseTwo}</Text>
            <Text>{fields.initialTwo}</Text>
          </View>
          <View style={liabilityStyles.row}>
            <Text style={liabilityStyles.text}>{clauseThree}</Text>
            <Text>{fields.initialThree}</Text>
          </View>
          <View style={liabilityStyles.row}>
            <Text style={liabilityStyles.text}>{clauseFour}</Text>
            <Text>{fields.initialFour}</Text>
          </View>
          <View style={liabilityStyles.row}>
            <Text style={liabilityStyles.text}>{clauseFive}</Text>
            <Text>{fields.initialFive}</Text>
          </View>
          <View style={liabilityStyles.row}>
            <Text style={liabilityStyles.text}>{clauseSix}</Text>
            <Text>{fields.initialSix}</Text>
          </View>
          <View style={liabilityStyles.last}>
            <Text style={liabilityStyles.introText}>{lastSection}</Text>
          </View>
          <View style={liabilityStyles.last}>
            <Text style={liabilityStyles.introText}>{typedSection}</Text>
          </View>
          <View style={liabilityStyles.signatureRow}>
            <Text style={liabilityStyles.signatureLabelLeft}>
              Member Signature
            </Text>
            <Text style={liabilityStyles.signatureLabelRight}>Date</Text>
          </View>
          <View
            style={{
              ...liabilityStyles.signatureRow,
              borderBottom: borders.black,
              marginBottom: spacing.ml,
            }}
          >
            <Text
              style={{
                ...liabilityStyles.signatureLabelLeft,
                ...liabilityStyles.signature,
              }}
            >
              {fields.memberSignature}
            </Text>
            <Text
              style={{
                ...liabilityStyles.signatureLabelRight,
                ...liabilityStyles.signature,
              }}
            >
              {new Date().toLocaleDateString('en-US')}
            </Text>
          </View>
        </Page>
        {isUnderEighteen(
          `${fields.dobYear}${fields.dobMonth}${fields.dobDay}`,
        ) && (
          <Page size="A4">
            <View style={{ ...liabilityStyles.last, marginTop: spacing.xxxxl }}>
              <Text style={liabilityStyles.introText}>{parentRelease}</Text>
            </View>
            <View style={liabilityStyles.signatureRow}>
              <Text style={liabilityStyles.signatureLabelLeft}>
                Parent/Guardian Signature
              </Text>
              <Text style={liabilityStyles.signatureLabelRight}>Date</Text>
            </View>
            <View style={liabilityStyles.signatureRow}>
              <Text
                style={{
                  ...liabilityStyles.signatureLabelLeft,
                  ...liabilityStyles.signature,
                }}
              >
                {fields.memberParentSignature}
              </Text>
              <Text
                style={{
                  ...liabilityStyles.signatureLabelRight,
                  ...liabilityStyles.signature,
                }}
              >
                {new Date().toLocaleDateString('en-US')}
              </Text>
            </View>
          </Page>
        )}
      </Document>
    );
  };

  handleSubmit = (blob: Blob) => (e: React.FormEvent) => {
    e.preventDefault();
    const { fields, handleSuccess, onSubmit } = this.props;
    onSubmit(
      (
        onSuccess: (callback?: () => void) => void,
        onFail: (error: Error) => void,
        resetForm: () => void,
        data: any,
      ) => {
        if (fields.sendLiabilityCopy) {
          blobToBase64String(blob).then(dataURL =>
            emailjs.send(
              'react_fitness_club',
              'rfc_liability_form',
              {
                content: dataURL.substring(dataURL.indexOf(',') + 1),
                email: fields.email,
                first_name: fields.firstName,
                from_name: `${fields.nickname || fields.firstName}`,
                last_name: fields.lastName,
              },
              process.env.REACT_APP_EMAILJS_KEY,
            ),
          );
        }
        blobToBase64String(blob).then(dataURL =>
          emailjs
            .send(
              'react_fitness_club',
              'rfc_member_signup',
              { ...data, waiver: dataURL.substring(dataURL.indexOf(',') + 1) },
              process.env.REACT_APP_EMAILJS_KEY,
            )
            .then(() => {
              onSuccess(handleSuccess);
              scrollToId('signup', { offset: -100 });
            })
            .catch((error: Error) => {
              onFail(error);
            }),
        );
      },
    );
  };

  render() {
    const { errors, fields, loading, onBack, onChange } = this.props;
    return (
      <div>
        <l.Space mx="auto" width={['100%', '90%', '80%']}>
          <t.Text mb={spacing.ml}>
            In order to participate in any React Fitness Club programs or
            activites, you must read and sign our liability waiver below.
          </t.Text>
          <t.Text mb={spacing.xl}>
            Enter your initials after each clause as marked and type your name
            in the signature field at the bottom before proceeding.
          </t.Text>
          <l.BorderLine height={1} mb={spacing.xl} />
          <t.Text center large mb={spacing.ml}>
            {title}
          </t.Text>
          <t.Text mb={spacing.xl}>{intro}</t.Text>
          <l.Flex columnOnMobile mb={spacing.ml}>
            <t.Text mb={[spacing.ml, 0, 0]} mr={spacing.ml}>
              {clauseOne}
            </t.Text>
            <div>
              <InitialInput
                error={R.contains('initialOne', errors)}
                helpText="initials"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange('initialOne', e.currentTarget.value);
                }}
                value={fields.initialOne}
              />
              <l.Space height={spacing.s} />
              <t.HelpText>initials</t.HelpText>
            </div>
          </l.Flex>
          <l.Flex columnOnMobile mb={spacing.ml}>
            <t.Text mb={[spacing.ml, 0, 0]} mr={spacing.ml}>
              {clauseTwo}
            </t.Text>
            <div>
              <InitialInput
                error={R.contains('initialTwo', errors)}
                helpText="initials"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange('initialTwo', e.currentTarget.value);
                }}
                value={fields.initialTwo}
              />
              <l.Space height={spacing.s} />
              <t.HelpText>initials</t.HelpText>
            </div>
          </l.Flex>
          <l.Flex columnOnMobile mb={spacing.ml}>
            <t.Text mb={[spacing.ml, 0, 0]} mr={spacing.ml}>
              {clauseThree}
            </t.Text>
            <div>
              <InitialInput
                error={R.contains('initialThree', errors)}
                helpText="initials"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange('initialThree', e.currentTarget.value);
                }}
                value={fields.initialThree}
              />
              <l.Space height={spacing.s} />
              <t.HelpText>initials</t.HelpText>
            </div>
          </l.Flex>
          <l.Flex columnOnMobile mb={spacing.xl}>
            <t.Text mb={[spacing.ml, 0, 0]} mr={spacing.ml}>
              {clauseFour}
            </t.Text>
            <div>
              <InitialInput
                error={R.contains('initialFour', errors)}
                helpText="initials"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange('initialFour', e.currentTarget.value);
                }}
                value={fields.initialFour}
              />
              <l.Space height={spacing.s} />
              <t.HelpText>initials</t.HelpText>
            </div>
          </l.Flex>
          <l.Flex columnOnMobile mb={spacing.xl}>
            <t.Text mb={[spacing.ml, 0, 0]} mr={spacing.ml}>
              {clauseFive}
            </t.Text>
            <div>
              <InitialInput
                error={R.contains('initialFive', errors)}
                helpText="initials"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange('initialFive', e.currentTarget.value);
                }}
                value={fields.initialFive}
              />
              <l.Space height={spacing.s} />
              <t.HelpText>initials</t.HelpText>
            </div>
          </l.Flex>
          <l.Flex columnOnMobile mb={spacing.xl}>
            <t.Text mb={[spacing.ml, 0, 0]} mr={spacing.ml}>
              {clauseSix}
            </t.Text>
            <div>
              <InitialInput
                error={R.contains('initialSix', errors)}
                helpText="initials"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange('initialSix', e.currentTarget.value);
                }}
                value={fields.initialSix}
              />
              <l.Space height={spacing.s} />
              <t.HelpText>initials</t.HelpText>
            </div>
          </l.Flex>
          <t.Text mb={spacing.xxxl}>{lastSection}</t.Text>
          <t.Text mb={spacing.xxxl}>{typedSection}</t.Text>
          <l.FlexColumn>
            <l.Flex mb={spacing.xxxl}>
              <div>
                <TextInput
                  error={R.contains('memberSignature', errors)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange('memberSignature', e.currentTarget.value);
                  }}
                  value={fields.memberSignature}
                />
                <l.Space height={spacing.s} />
                <t.HelpText>member signature</t.HelpText>
              </div>
              <l.Space width={spacing.xxl} />
              <div>
                <t.Text large>{new Date().toLocaleDateString('en-US')}</t.Text>
                <l.Space height={spacing.s} />
                <t.HelpText>date</t.HelpText>
              </div>
            </l.Flex>
            {isUnderEighteen(
              `${fields.dobYear}${fields.dobMonth}${fields.dobDay}`,
            ) && (
              <>
                <l.BorderLine height={2} width="80%" />
                <l.Space height={spacing.xxxl} />
                <t.Text mb={spacing.xxxl}>{parentRelease}</t.Text>
                <l.Flex mb={spacing.xxxl}>
                  <div>
                    <TextInput
                      error={R.contains('memberParentSignature', errors)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(
                          'memberParentSignature',
                          e.currentTarget.value,
                        );
                      }}
                      value={fields.memberParentSignature}
                    />
                    <l.Space height={spacing.s} />
                    <t.HelpText>
                      parent/guardian signature (member under 18)
                    </t.HelpText>
                  </div>
                  <l.Space width={spacing.xxl} />
                  <div>
                    <t.Text large>
                      {new Date().toLocaleDateString('en-US')}
                    </t.Text>
                    <l.Space height={spacing.s} />
                    <t.HelpText>date</t.HelpText>
                  </div>
                </l.Flex>
              </>
            )}
            <CheckboxRadioInputWithLabel
              checked={fields.sendLiabilityCopy}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange('sendLiabilityCopy', e.currentTarget.checked);
              }}
              text="Send a copy of my signed liability form to my email"
              type="checkbox"
            />
            <l.Space height={spacing.xl} />
          </l.FlexColumn>
          <BlobProvider document={this.generatePDF()}>
            {({ blob }: { blob: any }) => {
              return (
                <FormActions
                  forwardText="Complete Profile Setup"
                  handleBack={onBack}
                  handleForward={this.handleSubmit(blob)}
                  loading={loading}
                />
              );
            }}
          </BlobProvider>
        </l.Space>
      </div>
    );
  }
}

export default LiabilityWaiverStep;
