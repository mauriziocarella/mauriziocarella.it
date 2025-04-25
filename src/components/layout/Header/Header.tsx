import {Link} from '@/components/ui/Link/Link';
import Image from '@/components/ui/Image/Image';
import {Site} from '@/lib/site';

const Header = () => (
	<header className="flex items-center justify-center p-2">
		<Link
			href="/"
			className="text-inherit hover:no-underline hover:bg-background-800 py-2 px-4 rounded-lg transition-colors">
			<Image src="/images/logo.png" alt="Logo" className="h-8 w-8" />

			{Site.name}
		</Link>
	</header>
);

export default Header;
