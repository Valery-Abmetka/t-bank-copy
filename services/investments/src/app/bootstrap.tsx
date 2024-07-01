import { createRoot } from 'react-dom/client';
import { AppProvider } from './providers/AppProvider';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

container.render(<AppProvider />);
