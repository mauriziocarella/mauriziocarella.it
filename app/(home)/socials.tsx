import React from 'react';
import {
	FaDiscord,
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaTelegram,
	FaTwitter,
	FaWhatsapp,
} from 'react-icons/fa';
import {Tooltip} from '../../components/Tooltip';
import Link from 'next/link';

const socials = [
	{
		label: 'Facebook',
		icon: <FaFacebook />,
		link: 'https://www.facebook.com/maurizio.carella.16/',
	},
	{
		label: 'Github',
		icon: <FaGithub />,
		link: 'https://github.com/mauriziocarella/',
	},
	{
		label: 'Instagram',
		icon: <FaInstagram />,
		link: 'https://www.instagram.com/mauriziocarella/',
	},
	{
		label: 'Linkedin',
		icon: <FaLinkedin />,
		link: 'https://www.linkedin.com/in/mauriziocarella/',
	},
	{
		label: 'Telegram',
		icon: <FaTelegram />,
		link: 'https://t.me/mauriziocarella',
	},
	{
		label: 'Twitter',
		icon: <FaTwitter />,
		link: 'https://twitter.com/mauri_carella',
	},
	{
		label: 'Whatsapp',
		icon: <FaWhatsapp />,
		link: 'https://api.whatsapp.com/send?phone=00393428885573',
	},
	{
		label: 'Discord',
		icon: <FaDiscord />,
		link: 'https://discordapp.com/users/800654099157745714/',
	},
];

type SocialProps = {social: typeof socials[number]};
export const Social = ({social}: SocialProps) => (
	<Tooltip text={social.label}>
		<Link
			rel="noopener noreferrer"
			href={social.link}
			className="p-2 hover:text-primary"
			target="_blank"
			aria-label={social.label}>
			{social.icon}
		</Link>
	</Tooltip>
);

export const Socials = () => {
	return (
		<>
			{socials.map((social, index) => (
				<Social key={`social-${index}`} social={social} />
			))}
		</>
	);
};
