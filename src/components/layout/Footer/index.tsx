import {Link} from '@/components/ui/Link/Link';

export const Footer = () => {
	return (
		<ul className="flex justify-center gap mx-auto py-8">
			<li>
				<Link
					href="/privacy"
					target="_blank"
					rel="noopener noreferrer"
					className="text-inherit opacity-60 hover:opacity-100 transition-opacity">
					Privacy Policy
				</Link>
			</li>
			<li className="cursor-default opacity-60">•</li>
			<li>
				<Link
					href="/cookie-policy"
					target="_blank"
					rel="noopener noreferrer"
					className="text-inherit opacity-60 hover:opacity-100 transition-opacity">
					Cookie Policy
				</Link>
			</li>
		</ul>
	);
};
