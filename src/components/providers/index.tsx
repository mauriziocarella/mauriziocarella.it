import type {PropsWithChildren} from 'react';
import ReactQueryProvider from '@/components/providers/react-query';
import ThemeProvider from '@/components/providers/theme';

const AppProviders = ({children}: PropsWithChildren) => (
	<ThemeProvider>
		<ReactQueryProvider>{children}</ReactQueryProvider>
	</ThemeProvider>
);

export default AppProviders;
