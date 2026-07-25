import { AppLayout } from './layouts/app-layout';
import { ThemeProvider } from './providers/theme-provider';
import { KanbanPage } from '@pages';

function App() {
	return (
		<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
			<AppLayout>
				<KanbanPage />
			</AppLayout>
		</ThemeProvider>
	);
}

export default App;
