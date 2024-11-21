import type {PropsWithChildren} from 'react';
import ReactQueryProvider from '@/utils/providers/react-query';
import ThemeProvider from '@/utils/providers/theme';

const AppProviders = ({children}: PropsWithChildren) => (
	<ThemeProvider>
		<ReactQueryProvider>{children}</ReactQueryProvider>
	</ThemeProvider>
);

export default AppProviders;
