import ReactDOM from 'react-dom/client';
import './index.css';
import './reset-css.css';
import App from './root/app';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(<App />);
