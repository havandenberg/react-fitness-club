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
import * as firebase from 'firebase';
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
import { borders, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { getMemberRef } from '../../utils/member';
import { scrollToId } from '../../utils/scroll';
import { isUnderEighteen } from '../../utils/validation';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import { CheckboxRadioInputWithLabel } from '../Form/CheckboxRadio';
import { TextInput } from '../Form/Input';
import { processFormValues, SetupFields } from './';

export const LIABILITY_WAIVER = 'Liability Waiver';

const InitialInput = styled(TextInput)({ width: 50 });

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

class LiabilityWaiverStep extends React.Component<
  FormComponentProps<SetupFields>
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
          </View>
          <View style={liabilityStyles.row}>
            <Text style={liabilityStyles.text}>{clauseSix}</Text>
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
            }}>
            <Text
              style={{
                ...liabilityStyles.signatureLabelLeft,
                ...liabilityStyles.signature,
              }}>
              {fields.memberSignature}
            </Text>
            <Text
              style={{
                ...liabilityStyles.signatureLabelRight,
                ...liabilityStyles.signature,
              }}>
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
                }}>
                {fields.memberParentSignature}
              </Text>
              <Text
                style={{
                  ...liabilityStyles.signatureLabelRight,
                  ...liabilityStyles.signature,
                }}>
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
    const { fields, onSubmit } = this.props;
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const fileRef = firebase
        .storage()
        .ref(`members/${currentUser.uid}/liability-waiver.pdf`);
      fileRef.put(blob);
      if (fields.sendLiabilityCopy) {
        blobToBase64String(blob).then(dataURL =>
          emailjs.send(
            'react_fitness_club',
            'rfc_liability_form',
            {
              content: dataURL.substring(dataURL.indexOf(',') + 1),
              email: fields.email,
              from_name: `${fields.nickname || fields.firstName}`,
            },
            process.env.REACT_APP_EMAILJS_KEY,
          ),
        );
      }
    }
    onSubmit(
      (
        onSuccess: () => void,
        onFail: (error: Error) => void,
        resetForm: () => void,
        data: any,
      ) => {
        const user = firebase.auth().currentUser;
        if (user) {
          getMemberRef(user.uid)
            .update(processFormValues(data))
            .then(() => {
              onSuccess();
              scrollToId('top');
            })
            .catch((error: Error) => {
              onFail(error);
            });
        }
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
          <l.Flex mb={spacing.ml}>
            <t.Text mr={spacing.ml}>{clauseOne}</t.Text>
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
          <l.Flex mb={spacing.ml}>
            <t.Text mr={spacing.ml}>{clauseTwo}</t.Text>
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
          <l.Flex mb={spacing.ml}>
            <t.Text mr={spacing.ml}>{clauseThree}</t.Text>
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
          <l.Flex mb={spacing.xl}>
            <t.Text mr={spacing.ml}>{clauseFour}</t.Text>
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
          <t.Text mb={spacing.xl}>{clauseFive}</t.Text>
          <t.Text mb={spacing.xl}>{clauseSix}</t.Text>
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
            {({ blob }: { blob: Blob }) => {
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
