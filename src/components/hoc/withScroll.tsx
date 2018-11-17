import { parse } from 'querystring';
import * as React from 'react';
import { scrollToId } from '../../utils/scroll';

interface Props {
  location: {
    search: string;
  };
}

const withScroll = <P extends object>(Component: React.ComponentType<P>) =>
  class WithScroll extends React.Component<P & Props> {
    componentDidMount() {
      const id = parse(this.props.location.search)['?id'];
      scrollToId(id ? `${id}` : 'top');
    }
    render() {
      return <Component {...this.props} />;
    }
  };

export default withScroll;
