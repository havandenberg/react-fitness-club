import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import posed, { PoseGroup } from 'react-pose';
import { height, left, maxHeight } from 'styled-system';
import AlertImg from '../assets/images/alert.svg';
import CloseImg from '../assets/images/close.svg';
import l from '../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  shadows,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { Alert } from '../types/alert';
import { isMobileOnly, isTabletOnly } from '../utils/screensize';

const AlertWrapper = styled(l.Flex)({
  alignSelf: 'center',
  background: colors.background,
  border: borders.red,
  borderRadius: borders.radius,
  boxShadow: shadows.box,
  justifySelf: 'center',
  padding: spacing.t,
});

const AlertAnimation = posed.div({
  enter: {
    opacity: 1,
    transition: {
      default: {
        duration: 1000,
      },
      y: { ease: 'easeIn', duration: 1000 },
    },
    y: 0,
  },
  exit: {
    opacity: 0.2,
    transition: {
      default: {
        duration: 300,
      },
      y: { ease: 'easeIn', duration: 300 },
    },
    y: -50,
  },
  initialPose: {
    opacity: 1,
    y: 0,
  },
});

const CloseButton = styled(l.FlexCentered)({
  cursor: 'pointer',
});

const DateWrapper = styled(l.FlexColumn)({
  borderRight: borders.red,
});

interface AlertProps {
  alert: Alert;
  dismissAlert: () => void;
}

const AlertComponent = ({ alert, dismissAlert }: AlertProps) => {
  const alertMoment = moment(alert.start);
  return (
    <AlertWrapper alignTop mb={spacing.sm} width="100%">
      <l.Img
        height={spacing.xxl}
        width={spacing.xl}
        pt={spacing.s}
        src={AlertImg}
      />
      {alert.showStart && (
        <DateWrapper height="100%" pr={spacing.sm} mr={spacing.sm} spaceBetween>
          <t.Text bold color={colors.red} large>
            {alertMoment.format('ddd').toUpperCase()}
          </t.Text>
          <l.Flex spaceBetween>
            <t.HelpText bold color={colors.red}>
              {alertMoment.format('MMM')}
            </t.HelpText>
            <t.HelpText bold color={colors.red} ml={spacing.t}>
              {alertMoment.format('D')}
            </t.HelpText>
          </l.Flex>
        </DateWrapper>
      )}
      <l.Space width="100%">
        <t.Text bold>{alert.header}</t.Text>
        {alert.body && <t.Text color={colors.gray}>{alert.body}</t.Text>}
      </l.Space>
      <CloseButton
        height="100%"
        width={spacing.ml}
        onClick={() => dismissAlert()}>
        <l.Img height={spacing.ml} src={CloseImg} />
      </CloseButton>
    </AlertWrapper>
  );
};

const AlertsWrapper = styled(l.Scroll)(
  {
    position: 'absolute',
    top: spacing.xl,
    [breakpoints.mobile]: {
      position: 'static',
    },
  },
  height,
  left,
  maxHeight,
);

interface Props {
  alerts: Alert[];
  secondary: boolean;
}

interface State {
  alerts: Alert[];
}

class Alerts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      alerts: this.filterAndSortAlerts(props.alerts),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!R.equals(nextProps.alerts, this.props.alerts)) {
      this.setState({
        alerts: this.filterAndSortAlerts(nextProps.alerts),
      });
    }
  }

  handleDismissAlert = (id: string) => {
    this.setState({
      alerts: this.state.alerts.map((alert: Alert) =>
        R.equals(alert.id, id) ? { ...alert, dismissed: true } : alert,
      ),
    });
  };

  filterAndSortAlerts = (alerts: Alert[]) =>
    R.sortBy(
      (alert: Alert) => alert.priority * -1,
      alerts.filter((alert: Alert) => moment().diff(alert.expire) < 0),
    );

  render() {
    const { secondary } = this.props;
    const { alerts } = this.state;
    const allAlertsDismissed = R.reduce(
      (acc: boolean, alert: Alert) => acc && alert.dismissed,
      true,
      alerts,
    );
    return (
      <AlertsWrapper
        height={allAlertsDismissed ? 0 : 'auto'}
        left={
          isMobileOnly()
            ? 0
            : secondary
            ? isTabletOnly()
              ? 200
              : 300
            : spacing.ml
        }
        maxHeight={[200, 150, 200]}
        px={[spacing.s, 0, 0]}
        showScrollBar={false}
        width={['100%', secondary ? '45%' : '35%', '35%']}>
        <PoseGroup staggerChildren={300}>
          {alerts.map((alert: Alert, index: number) => {
            return (
              !alert.dismissed && (
                <AlertAnimation key={alert.id} index={index}>
                  <AlertComponent
                    alert={alert}
                    dismissAlert={() => this.handleDismissAlert(alert.id)}
                  />
                </AlertAnimation>
              )
            );
          })}
        </PoseGroup>
      </AlertsWrapper>
    );
  }
}

export default Alerts;
