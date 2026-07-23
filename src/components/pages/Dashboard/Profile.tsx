import NextImage from 'next/image';
import GitHubIcon from '@/components/ui/Icons/Brand/GitHubIcon';
import {EmailSocial} from './ProfileActions';

const Profile = () => {
	return (
		<section className="relative overflow-hidden h-screen flex flex-col gap justify-center items-center text-center p-2">
			<div className="border rounded-2xl relative overflow-hidden px-8 py-6 backdrop-blur-[2px] bg-background/10 transition duration-500 ease-in-out transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.018] hover:shadow-lg">
				<div className="relative h-full flex flex-col gap-4 justify-center items-center text-center">
					<div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
						<NextImage
							src="/images/logo.png"
							alt="Logo"
							width={128}
							height={128}
							preload
							fetchPriority="high"
							decoding="async"
							className="size-full object-contain"
						/>
					</div>

					<div className="text-3xl">Maurizio Carella</div>
					<div className="italic">FullStack developer</div>

					<div className="flex justify-center items-center gap-2 mt-2">
						<a
							href="https://github.com/mauriziocarella"
							title="GitHub Profile"
							target="_blank"
							className="inline-flex items-center w-fit gap-2 hover:underline underline-offset-2 font-medium transition-colors text-inherit hover:text-accent">
							<GitHubIcon className="size-6" />
						</a>
						<EmailSocial />
					</div>
				</div>
			</div>

			<a
				href="#apps"
				className="absolute bottom-2 inset-x-auto p cursor-pointer opacity-100 transition-opacity"
				aria-label="Scroll to apps">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="size-6 animate-bounce"
					aria-hidden="true">
					<path d="M12 5v14" />
					<path d="m19 12-7 7-7-7" />
				</svg>
			</a>
		</section>
	);
};

export default Profile;
