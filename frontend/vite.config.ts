import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@ui': path.resolve(__dirname, './src/shared/ui'),
			'@lib': path.resolve(__dirname, './src/shared/lib'),
			'@utils': path.resolve(__dirname, './src/shared/lib/utils'),
			'@hooks': path.resolve(__dirname, './src/shared/hooks'),
			'@hocs': path.resolve(__dirname, './src/shared/hocs'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@features': path.resolve(__dirname, './src/features'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@app': path.resolve(__dirname, './src/app'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@api': path.resolve(__dirname, './src/shared/api'),

		},
	},
});
