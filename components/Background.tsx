import React, {useCallback} from 'react';
import Particles from 'react-tsparticles';
import {loadFull} from 'tsparticles';
import {Engine} from 'tsparticles-engine';

const Background = () => {
	const particlesInit = useCallback(async (engine: Engine) => {
		await loadFull(engine);
	}, []);

	return (
		<>
			<div className="fixed w-screen h-screen opacity-5" style={{zIndex: -1}}>
				<Particles
					init={particlesInit}
					options={{
						particles: {
							number: {
								value: 76,
								density: {
									enable: true,
									value_area: 4734.960581453156,
								},
							},
							color: {
								value: '#ffffff',
							},
							shape: {
								type: 'polygon',
								stroke: {
									width: 0,
									color: '#000000',
								},
								polygon: {
									nb_sides: 6,
								},
							},
							opacity: {
								value: 1,
								random: false,
								anim: {
									enable: false,
									speed: 1,
									opacity_min: 0.1,
									sync: false,
								},
							},
							size: {
								value: 15.783201938177186,
								random: true,
								anim: {
									enable: false,
									speed: 0,
									size_min: 40.388946161284391,
									sync: false,
								},
							},
							line_linked: {
								enable: false,
								distance: 150,
								color: '#ffffff',
								opacity: 0.4,
								width: 1,
							},
							move: {
								enable: true,
								speed: 3.156640387635437,
								direction: 'bottom-right',
								random: true,
								straight: true,
								out_mode: 'out',
								bounce: false,
								attract: {
									enable: false,
									rotateX: 631.3280775270874,
									rotateY: 868.0761065997452,
								},
							},
						},
						interactivity: {
							// "detect_on": "canvas",
							events: {
								onhover: {
									enable: false,
									mode: 'repulse',
								},
								onclick: {
									enable: false,
									mode: 'push',
								},
								resize: true,
							},
							modes: {
								grab: {
									distance: 400,
									line_linked: {
										opacity: 1,
									},
								},
								bubble: {
									distance: 400,
									size: 40,
									duration: 2,
									opacity: 8,
									// "speed": 3
								},
								repulse: {
									distance: 200,
									duration: 0.4,
								},
								push: {
									particles_nb: 4,
								},
								remove: {
									particles_nb: 2,
								},
							},
						},
						retina_detect: true,
					}}
				/>
			</div>
		</>
	);
};

export default Background;
