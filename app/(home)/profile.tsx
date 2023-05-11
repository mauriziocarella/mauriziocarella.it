import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import imgProfile from '../../public/images/profile.png';
import Link from 'next/link';
import {Socials} from './socials';

type ProfileProps = React.ComponentProps<'div'>;
export const Profile = ({className, ...props}: ProfileProps) => {
	return (
		<div className={classNames('text-center px-2', className)} {...props}>
			<div className="text-4xl my-3 font-medium">About me</div>
			<Image
				src={imgProfile}
				alt="Profile picture"
				className="mx-auto shadow-xl rounded-full overflow-hidden w-[200px]"
			/>

			<div className="px-2 my-4">
				<div className="text-2xl mb-4 font-medium">Maurizio Carella</div>
				<div className="text-lg">
					Ciao! I am a 5 years experienced full stack developer skilled in React, NodeJS, Laravel, PHP, MySQL, MongoDB.
					I am actually full-time employed as project manager/web developer at{' '}
					<Link target="_blank" rel="noopener noreferrer" href="https://meway.it" className="hover:text-primary">
						@Meway SRL
					</Link>
				</div>
			</div>

			<div className="text-center flex flex-wrap justify-center items-center text-2xl">
				<Socials />
			</div>
		</div>
	);
};
