import {Link} from '@/components/Link';

export const Footer = () => {
	return (
		<ul className="flex justify-center gap mx-auto text-gray-500 py-8">
			<li>
				<Link
					href="https://www.iubenda.com/privacy-policy/53338723"
					target="_blank"
					className="text-inherit hover:text-foreground transition-colors"
					title="Privacy Policy">
					Privacy Policy
				</Link>
			</li>
			<li className="cursor-default">•</li>
			<li>
				<Link
					href="https://www.iubenda.com/privacy-policy/53338723/cookie-policy"
					target="_blank"
					className="text-inherit hover:text-foreground transition-colors"
					title="Cookie Policy">
					Cookie Policy
				</Link>
			</li>
		</ul>
	);
};
