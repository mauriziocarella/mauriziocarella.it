import dynamic from 'next/dynamic';
import Profile from '@/components/pages/Dashboard/Profile';

const Apps = dynamic(() => import('@/components/pages/Dashboard/Apps'));
const Repositories = dynamic(
	() => import('@/components/pages/Dashboard/Repositories'),
);

const DashboardPage = () => {
	return (
		<>
			<Profile />
			<Apps />
			<Repositories />
		</>
	);
};

export default DashboardPage;
