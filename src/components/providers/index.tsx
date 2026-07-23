import type {PropsWithChildren} from 'react';
import ThemeProvider from '@/components/providers/theme';

const AppProviders = ({children}: PropsWithChildren) => (
	<ThemeProvider>{children}</ThemeProvider>
);

export default AppProviders;
