'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {type PropsWithChildren, useEffect} from 'react';

export type ModalProps = PropsWithChildren<{isOpen: boolean; close(): void}>;
export const Modal = ({isOpen, close, children}: ModalProps) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 flex justify-center items-center bg-black/70 z-modal"
					variants={{
						hidden: {
							opacity: 0,
						},
						visible: {
							opacity: 1,
							transition: {
								// duration: 1,
								// delayChildren: 0.2, // To delay the child animation
							},
						},
					}}
					initial="hidden"
					animate="visible"
					exit="hidden"
					onClick={close}>
					<motion.div
						onClick={(e) => e.stopPropagation()}
						className="bg-white w-full max-w-screen-md rounded-xl min-h-44 m"
						variants={{
							hidden: {
								y: '100px',
								opacity: 0,
							},
							visible: {
								y: '0',
								opacity: 1,
								transition: {
									duration: 0.1,
									// type: 'spring',
									// damping: 25,
									// stiffness: 500,
								},
							},
							exit: {
								y: '100px',
								opacity: 0,
							},
						}}>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
