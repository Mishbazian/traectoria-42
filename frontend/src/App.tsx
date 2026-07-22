import './App.css';
import { AppLayout } from './app/layouts/app-layout';
import { ThemeProvider } from './app/providers/theme-provider';
import { KanbanPage } from './pages/kanban-page';

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
