import 'animate.css/animate.min.css';
import * as React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as ReactDOM from 'react-dom';
import * as ReactModal from 'react-modal';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/fonts.css';
import './styles/global.css';

ReactModal.setAppElement('#root');

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
