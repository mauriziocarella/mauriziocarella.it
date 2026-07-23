import Profile from '@/components/pages/Dashboard/Profile';
import Apps from '@/components/pages/Dashboard/Apps';
import Repositories from '@/components/pages/Dashboard/Repositories';

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
