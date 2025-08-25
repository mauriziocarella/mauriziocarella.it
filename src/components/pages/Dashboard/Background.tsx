import {type PropsWithChildren, useCallback, useMemo, useRef} from 'react';
import clsx from '@/lib/clsx';
import {useEvent, useMount} from 'react-use';

type BackgroundProps = PropsWithChildren<{
	className?: string;
	containerClassName?: string;
}>;
const Background = ({
	className,
	containerClassName,
	children,
}: BackgroundProps) => {
	const {glitchSpeed, glitchColors, smooth} = useMemo(
		() => ({
			glitchSpeed: 100,
			glitchColors: [
				'--color-primary',
				'--color-secondary',
				'--color-accent',
			],
			smooth: true,
		}),
		[],
	);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);
	const letters = useRef<
		{
			char: string;
			color: string;
			targetColor: string;
			colorProgress: number;
		}[]
	>([]);
	const grid = useRef({columns: 0, rows: 0});
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const lastGlitchTime = useRef(Date.now());

	const fontSize = 16;
	const charWidth = 10;
	const charHeight = 20;

	const lettersAndSymbols = useMemo(
		() => [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
			'!',
			'@',
			'#',
			'$',
			'&',
			'*',
			'(',
			')',
			'-',
			'_',
			'+',
			'=',
			'/',
			'[',
			']',
			'{',
			'}',
			';',
			':',
			'<',
			'>',
			',',
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
		],
		[],
	);

	const getRandomChar = useCallback(() => {
		return lettersAndSymbols[
			Math.floor(Math.random() * lettersAndSymbols.length)
		];
	}, [lettersAndSymbols]);

	const getRandomColor = useCallback(() => {
		if (!canvasRef.current) return '';

		const property =
			glitchColors[Math.floor(Math.random() * glitchColors.length)];
		return getComputedStyle(canvasRef.current).getPropertyValue(property);
	}, [glitchColors]);

	const hexToRgb = (hex: string) => {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, (m, r, g, b) => {
			return r + r + g + g + b + b;
		});

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				}
			: null;
	};

	const interpolateColor = (
		start: {r: number; g: number; b: number},
		end: {r: number; g: number; b: number},
		factor: number,
	) => {
		const result = {
			r: Math.round(start.r + (end.r - start.r) * factor),
			g: Math.round(start.g + (end.g - start.g) * factor),
			b: Math.round(start.b + (end.b - start.b) * factor),
		};
		return `rgb(${result.r}, ${result.g}, ${result.b})`;
	};

	const calculateGrid = (width: number, height: number) => {
		const columns = Math.ceil(width / charWidth);
		const rows = Math.ceil(height / charHeight);
		return {columns, rows};
	};

	const initializeLetters = useCallback(
		(columns: number, rows: number) => {
			grid.current = {columns, rows};
			const totalLetters = columns * rows;
			letters.current = Array.from({length: totalLetters}, () => ({
				char: getRandomChar(),
				color: getRandomColor(),
				targetColor: getRandomColor(),
				colorProgress: 1,
			}));
		},
		[getRandomChar, getRandomColor],
	);

	const drawLetters = useCallback(() => {
		if (!context.current || letters.current.length === 0) return;
		const ctx = context.current;
		const {width, height} = canvasRef.current!.getBoundingClientRect();
		ctx.clearRect(0, 0, width, height);
		ctx.font = `${fontSize}px monospace`;
		ctx.textBaseline = 'top';

		letters.current.forEach((letter, index) => {
			const x = (index % grid.current.columns) * charWidth;
			const y = Math.floor(index / grid.current.columns) * charHeight;
			ctx.fillStyle = letter.color;
			ctx.fillText(letter.char, x, y);
		});
	}, []);
	const resizeCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;

		const dpr = window.devicePixelRatio || 1;
		const rect = parent.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		canvas.style.width = `${rect.width}px`;
		canvas.style.height = `${rect.height}px`;

		if (context.current) {
			context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		const {columns, rows} = calculateGrid(rect.width, rect.height);
		initializeLetters(columns, rows);
		drawLetters();
	}, [drawLetters, initializeLetters]);

	const updateLetters = useCallback(() => {
		if (!letters.current || letters.current.length === 0) return;

		const updateCount = Math.max(
			1,
			Math.floor(letters.current.length * 0.05),
		);

		for (let i = 0; i < updateCount; i++) {
			const index = Math.floor(Math.random() * letters.current.length);
			if (!letters.current[index]) continue;

			letters.current[index].char = getRandomChar();
			letters.current[index].targetColor = getRandomColor();

			if (!smooth) {
				letters.current[index].color =
					letters.current[index].targetColor;
				letters.current[index].colorProgress = 1;
			} else {
				letters.current[index].colorProgress = 0;
			}
		}
	}, [getRandomChar, getRandomColor, smooth]);

	const handleSmoothTransitions = useCallback(() => {
		let needsRedraw = false;
		letters.current.forEach((letter) => {
			if (letter.colorProgress < 1) {
				letter.colorProgress += 0.05;
				if (letter.colorProgress > 1) letter.colorProgress = 1;

				const startRgb = hexToRgb(letter.color);
				const endRgb = hexToRgb(letter.targetColor);
				if (startRgb && endRgb) {
					letter.color = interpolateColor(
						startRgb,
						endRgb,
						letter.colorProgress,
					);
					needsRedraw = true;
				}
			}
		});

		if (needsRedraw) {
			drawLetters();
		}
	}, [drawLetters]);

	const animate = useCallback(() => {
		const now = Date.now();
		if (now - lastGlitchTime.current >= glitchSpeed) {
			updateLetters();
			drawLetters();
			lastGlitchTime.current = now;
		}

		if (smooth) {
			handleSmoothTransitions();
		}

		animationRef.current = requestAnimationFrame(animate);
	}, [
		glitchSpeed,
		smooth,
		updateLetters,
		drawLetters,
		handleSmoothTransitions,
	]);

	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		context.current = canvas.getContext('2d');
		resizeCanvas();
		animate();
	}, [animate, resizeCanvas]);

	useMount(draw);
	useEvent('resize', draw);

	return (
		<div className={clsx('relative overflow-hidden', containerClassName)}>
			<canvas
				ref={canvasRef}
				className="block w-full h-full opacity-25"
			/>
			<div className="absolute inset-0 size-full pointer-events-none bg-gradient-to-b from-transparent to-background" />
			<div className={clsx('absolute inset-0 size-full', className)}>
				{children}
			</div>
		</div>
	);
};

export default Background;
