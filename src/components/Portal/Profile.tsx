import * as React from 'react';
import styled from 'react-emotion';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/member';
import { getMemberFullName } from '../../utils/member';
import {
  isDesktop,
  isMobile,
  isMobileOnly,
  isTabletUp,
} from '../../utils/screensize';
import { ButtonPrimary } from '../Form/Button';
import withScroll from '../hoc/withScroll';
import ProfilePhoto from '../ProfilePhoto';

export const LABEL_WIDTH = 200;

const ProfileInfo = styled('div')({
  flex: 1,
});

interface Props {
  isAdmin?: boolean;
  setView?: () => void;
  member: Member;
}

const Profile = (props: Props) => {
  const { isAdmin, setView, member } = props;

  const ProfileField = ({ label, value }: { label: string; value: string }) => (
    <l.Flex
      alignTop={isMobile()}
      flexDirection={
        isMobileOnly() || (isMobile() && isAdmin) ? 'column' : 'row'
      }
      mb={[spacing.ml, spacing.sm]}>
      <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
        {label}
      </t.Text>
      <t.Text
        large
        overflowX
        maxWidth={isAdmin ? (isDesktop() ? 400 : 350) : undefined}>
        {value}
      </t.Text>
    </l.Flex>
  );
  return (
    <l.Flex
      alignTop={isTabletUp()}
      flexDirection={isMobile() || isAdmin ? 'column' : 'row'}
      width={isAdmin ? '100%' : undefined}>
      <l.FlexCentered alignSelf={isAdmin ? 'center' : undefined}>
        <ProfilePhoto
          sideLength={[150, 175, 200]}
          imageSrc={member.profilePhotoUrl}
        />
      </l.FlexCentered>
      <l.Space height={spacing.xxxl} width={spacing.xxxxxl} />
      <ProfileInfo>
        <ProfileField label="Name:" value={getMemberFullName(member)} />
        <ProfileField label="Email:" value={member.email} />
        <ProfileField label="Phone:" value={member.phone} />
        <ProfileField
          label="DOB:"
          value={`${member.dateOfBirth.month}/${member.dateOfBirth.day}/${
            member.dateOfBirth.year
          }`}
        />
        <l.Space height={spacing.ml} />
        <t.Text bold large mb={[spacing.s, spacing.sm]}>
          Allergies:
        </t.Text>
        <t.Text
          large
          maxWidth={isTabletUp() ? 550 : undefined}
          mb={spacing.xl}
          overflowX>
          {member.allergies}
        </t.Text>
        <t.Text bold large mb={[spacing.s, spacing.sm]}>
          Medical Info:
        </t.Text>
        <t.Text
          large
          maxWidth={isTabletUp() ? 550 : undefined}
          mb={spacing.xl}
          overflowX>
          {member.medicalConditions}
        </t.Text>
        <t.Text bold large mb={[spacing.ml, spacing.sm]}>
          Emergency Contact Info:
        </t.Text>
        <ProfileField
          label="Name:"
          value={`${member.emergencyContact.firstName} ${
            member.emergencyContact.lastName
          }`}
        />
        <ProfileField label="Email:" value={member.emergencyContact.email} />
        <ProfileField label="Phone:" value={member.emergencyContact.phone} />
        <ProfileField
          label="Relationship:"
          value={member.emergencyContact.relationship}
        />
      </ProfileInfo>
      {setView && (
        <l.Flex mt={[spacing.xl, spacing.xxxl, 0]}>
          <ButtonPrimary onClick={setView}>Edit</ButtonPrimary>
        </l.Flex>
      )}
    </l.Flex>
  );
};

export default withScroll(Profile);
