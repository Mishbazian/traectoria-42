import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createStore, Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

const store = createStore();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<DevTools store={store} />
			<App />
		</Provider>
	</StrictMode>
);
