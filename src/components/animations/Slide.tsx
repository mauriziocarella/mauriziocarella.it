import {motion} from 'framer-motion';
import type {PropsWithChildren} from 'react';

export type SlideProps = PropsWithChildren<{
	duration?: number;
}>;
const Slide = ({children, duration = 0.5}: SlideProps) => {
	return (
		<motion.div
			initial="close"
			animate="open"
			transition={{duration}}
			variants={{
				close: {
					height: 0,
					opacity: 0,
				},
				open: {
					height: 'auto',
					opacity: 1,
				},
			}}>
			{children}
		</motion.div>
	);
};

export default Slide;
