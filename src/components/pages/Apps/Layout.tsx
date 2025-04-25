import type {PropsWithChildren} from 'react';
import Header from '@/components/layout/Header/Header';

const AppsLayout = ({children}: PropsWithChildren) => {
	return (
		<>
			<Header />

			{children}
		</>
	);
};

export default AppsLayout;
