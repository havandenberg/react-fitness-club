import * as React from 'react';
import styled from 'react-emotion';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/user';
import { isMobile } from '../../utils/screensize';
import { ButtonPrimary } from '../Form/Button';
import withScroll from '../hoc/withScroll';
import ProfilePhoto from '../ProfilePhoto';

const LABEL_WIDTH = 200;

const ProfileInfo = styled('div')({
  flex: 1,
});

interface Props {
  setView: () => void;
  user: Member;
}

class Profile extends React.Component<Props> {
  render() {
    const { setView, user } = this.props;
    return (
      <div>
        <l.Flex
          alignTop={!isMobile()}
          flexDirection={isMobile() ? 'column' : 'row'}
          alignItems={isMobile() ? 'center' : 'flex-start'}
        >
          <ProfilePhoto
            sideLength={[150, 200]}
            imageSrc={user.profilePhotoUrl}
          />
          <l.Space height={spacing.xxxl} width={spacing.xxxxxl} />
          <ProfileInfo>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Name:
              </t.Text>
              <t.Text large>{`${user.firstName} ${user.lastName}${
                user.nickname ? ' (' + user.nickname + ')' : ''
              }`}</t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Email:
              </t.Text>
              <t.Text large>{user.email}</t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Phone:
              </t.Text>
              <t.Text large>{user.phone}</t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.xl]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                DOB:
              </t.Text>
              <t.Text large>
                {user.dateOfBirth.month}/{user.dateOfBirth.day}/
                {user.dateOfBirth.year}
              </t.Text>
            </l.Flex>
            <t.Text bold large mb={[spacing.s, spacing.sm]}>
              Medical Info:
            </t.Text>
            <t.Text large mb={spacing.xl}>
              {user.medicalConditions}
            </t.Text>
            <t.Text bold large mb={[spacing.ml, spacing.sm]}>
              Emergency Contact Info:
            </t.Text>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Name:
              </t.Text>
              <t.Text large>
                {user.emergencyContact.firstName}{' '}
                {user.emergencyContact.lastName}
              </t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Email:
              </t.Text>
              <t.Text large>{user.emergencyContact.email}</t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Phone:
              </t.Text>
              <t.Text large>{user.emergencyContact.phone}</t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Relationship:
              </t.Text>
              <t.Text large>{user.emergencyContact.relationship}</t.Text>
            </l.Flex>
          </ProfileInfo>
          <l.Flex mt={[spacing.xl, spacing.xxxl, 0]}>
            <ButtonPrimary onClick={setView}>Edit</ButtonPrimary>
          </l.Flex>
        </l.Flex>
      </div>
    );
  }
}

export default withScroll(Profile);
