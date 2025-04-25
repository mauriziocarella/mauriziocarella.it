import {Link} from '@/components/ui/Link/Link';

export const Footer = () => {
	return (
		<ul className="flex justify-center gap mx-auto py-8">
			<li>
				<Link
					href="https://www.iubenda.com/privacy-policy/53338723"
					target="_blank"
					className="text-inherit opacity-50 hover:opacity-100 transition-opacity">
					Privacy Policy
				</Link>
			</li>
			<li className="cursor-default opacity-50">•</li>
			<li>
				<Link
					href="https://www.iubenda.com/privacy-policy/53338723/cookie-policy"
					target="_blank"
					className="text-inherit opacity-50 hover:opacity-100 transition-opacity">
					Cookie Policy
				</Link>
			</li>
		</ul>
	);
};
