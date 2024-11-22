import PasswordGenerator from '@/components/pages/Apps/Password-Generator/PasswordGenerator';
import {generateMetadata} from '@/lib/site';

export const metadata = generateMetadata({
	title: 'Password Generator',
	description: 'Simple password generator',
});

export default PasswordGenerator;
