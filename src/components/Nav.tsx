import * as React from 'react';
import styled from 'react-emotion';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import * as Sticky from 'react-stickynode';
// import UserImg from '../assets/images/user.svg';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  fontSizes,
  gradients,
  navHeight,
  navHeightMobile,
  spacing,
  transitions,
  z,
} from '../styles/theme';
import t from '../styles/typography';
import { isMobile } from '../utils/screensize';
import Divider from './Divider';

interface Item {
  name: string;
  path: string;
}

const navItems = [
  { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  // { name: 'Programs', path: '/programs' },
  // { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const ActiveIndicator = styled('div')(
  {
    bottom: 6,
    height: 6,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    transition: transitions.default,
    width: spacing.ml,
    zIndex: z.mid,
  },
  ({ active }: { active: boolean }) => ({
    background: active ? colors.red : colors.white,
  }),
);

const NavWrapper = styled(l.Flex)({
  background: gradients.black,
  height: navHeight,
  [breakpoints.mobile]: {
    height: navHeightMobile,
  },
});

const NavItemWrapper = styled(l.Flex)({
  alignSelf: 'flex-start',
  cursor: 'pointer',
  height: `calc(${navHeight} + 18px)`,
  zIndex: z.high,
  [breakpoints.mobile]: {
    height: spacing.xl,
  },
  [breakpoints.small]: {
    height: spacing.xl,
  },
});

const NavText = styled(t.Text)({
  '.active-nav &': {
    color: colors.red,
  },
  color: colors.white,
  height: `calc(${navHeight} + 18px)`,
  paddingTop: spacing.s,
  textAlign: 'center',
  transition: transitions.default,
  width: spacing.huge,
  [breakpoints.tablet]: {
    width: 100,
  },
  [breakpoints.mobile]: {
    height: spacing.xxl,
    paddingTop: 0,
    width: 90,
  },
  [breakpoints.small]: {
    fontSize: fontSizes.small,
    width: 75,
  },
});

const NavItem = ({
  active,
  onMouseEnter,
  onMouseLeave,
  text,
  to,
}: {
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  text: string;
  to: string;
}) => (
  <NavItemWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <NavLink activeClassName="active-nav" exact to={to}>
      <l.Space className={active && 'active-nav'} position="relative">
        <ActiveIndicator active={active} />
        <NavText>{text}</NavText>
      </l.Space>
    </NavLink>
  </NavItemWrapper>
);

// const UserIcon = styled('img')({
//   height: spacing.l,
//   [breakpoints.mobile]: {
//     height: spacing.ml,
//     transform: `translateY(-${spacing.t})`,
//   },
// });

interface State {
  hoverItem: number;
}

class Nav extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      hoverItem: -1,
    };
  }

  onMouseEnter = (i: number) => {
    this.setState({ hoverItem: i });
  };

  onMouseLeave = () => {
    this.setState({ hoverItem: -1 });
  };

  render() {
    const { location } = this.props;
    const { hoverItem } = this.state;
    return (
      <Sticky innerZ={z.max}>
        <NavWrapper columnOnMobile spaceBetween>
          <NavLink exact to="/">
            <l.Flex height={['auto', navHeight]}>
              <t.Text
                bold
                color={colors.white}
                ml={[0, spacing.sm]}
                my={[spacing.s, 0]}
                nowrap
              >
                REACT FITNESS CLUB
              </t.Text>
            </l.Flex>
          </NavLink>
          <l.Flex height="100%">
            {navItems.map((item: Item, i: number) => {
              const active = i === hoverItem || item.path === location.pathname;
              return (
                <NavItem
                  active={active}
                  key={item.name}
                  onMouseEnter={() => this.onMouseEnter(i)}
                  onMouseLeave={this.onMouseLeave}
                  text={item.name}
                  to={item.path}
                />
              );
            })}
            {!isMobile() && (
              <l.FlexCentered width={[spacing.xl, spacing.xxxxxl]}>
                {/* <UserIcon src={UserImg} /> */}
              </l.FlexCentered>
            )}
          </l.Flex>
        </NavWrapper>
        <Divider />
      </Sticky>
    );
  }
}

export default withRouter(Nav);
