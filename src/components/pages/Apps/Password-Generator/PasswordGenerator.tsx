'use client';

import {useCopyToClipboard, useEvent, useLocalStorage} from 'react-use';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Card} from '@/components/Card';
import {Slider} from '@/components/Slider';
import {Checkbox} from '@/components/Checkbox';
import {Input} from '@/components/Input';
import {Button} from '@/components/Button';
import {ClipboardCheckIcon, ClipboardIcon, LightbulbIcon} from 'lucide-react';
import {KeyboardShortcut} from '@/components/Shortcut';
import {ClientLoader, ClientOnly} from '@/components/Client';
import useNavigator from '@/lib/hooks/useNavigator';
import Slide from '@/components/animations/Slide';

const PasswordGenerator = () => {
	const [, setClipboard] = useCopyToClipboard();
	const {isMac} = useNavigator();

	const [length = 12, setLength] = useLocalStorage<number>('length', 12);
	const [symbols, setSymbols] = useLocalStorage<boolean>('symbols', true);
	const [numbers, setNumbers] = useLocalStorage<boolean>('numbers', true);
	const [lowercase, setLowercase] = useLocalStorage<boolean>(
		'lowercase',
		true,
	);
	const [uppercase, setUppercase] = useLocalStorage<boolean>(
		'uppercase',
		true,
	);

	const [copied, setCopied] = useState(false);
	const copyTimeout = useRef<ReturnType<typeof setTimeout>>(null);

	const input = useRef<HTMLInputElement>(null);

	const [password, setPassword] = useState('');

	const chars = useMemo(() => {
		let chars = '';
		if (numbers) chars += '0123456789';
		if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
		if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (symbols) chars += '!+@#_-$%&';

		return chars;
	}, [lowercase, numbers, symbols, uppercase]);

	const generate = useCallback(() => {
		let password = '';
		for (let i = 0; i < length; i++) {
			password += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		setPassword(password);
	}, [chars, length]);

	const copy = useCallback(() => {
		if (input.current) {
			setClipboard(input.current?.value);
			setCopied(true);
		}
	}, [setClipboard]);

	useEffect(() => {
		generate();
	}, [generate]);

	const selected = useRef(false);
	useEffect(() => {
		if (!selected.current && input.current) {
			if (input.current.value.length > 0) {
				setTimeout(() => input.current?.select(), 1);
				selected.current = true;
			}
		}
	}, [password]);

	useEffect(() => {
		if (copyTimeout.current) clearTimeout(copyTimeout.current);

		if (copied) {
			copyTimeout.current = setTimeout(() => setCopied(false), 1500);
		}
	}, [copied]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'c' && (isMac ? e.metaKey : e.ctrlKey)) {
				copy();
			}
		},
		[copy, isMac],
	);

	useEvent('keydown', onKeyDown);

	return (
		<div className="flex-grow flex items-center justify-center m-2">
			<div className="flex-1 max-w-2xl">
				<header className="text-center mb-4">
					<h1 className="text-lg">Generate random Password</h1>
				</header>
				<Card className="mx-auto relative overflow-hidden">
					<div className="mb-6 space-y-2">
						<Slider
							label="Length"
							min={4}
							value={length}
							onChange={(e) =>
								setLength(Number(e.currentTarget.value))
							}
						/>

						<div className=" gap-2">
							<Checkbox
								label="Symbols"
								checked={symbols}
								onChange={(e) =>
									setSymbols(e.currentTarget.checked)
								}
							/>
							<Checkbox
								label="Lowercase"
								checked={lowercase}
								onChange={(e) =>
									setLowercase(e.currentTarget.checked)
								}
							/>
							<Checkbox
								label="Uppercase"
								checked={uppercase}
								onChange={(e) =>
									setUppercase(e.currentTarget.checked)
								}
							/>
							<Checkbox
								label="Numbers"
								checked={numbers}
								onChange={(e) =>
									setNumbers(e.currentTarget.checked)
								}
							/>
						</div>
					</div>

					<Input
						ref={input}
						label="Password"
						value={password}
						readOnly
						ActionComponent={
							<Button
								color={copied ? 'success' : 'default'}
								onClick={copy}>
								{copied ? (
									<>
										<ClipboardCheckIcon /> Copied!
									</>
								) : (
									<>
										<ClipboardIcon /> Copy
									</>
								)}
							</Button>
						}
						autoFocus
						className="mb-2"
						onFocus={(e) => {
							e.currentTarget.select();
						}}
					/>

					<Button
						className="w-full"
						color="primary"
						onClick={generate}>
						GENERATE
					</Button>

					<ClientLoader />
				</Card>

				<Hints />
			</div>
		</div>
	);
};

const Hints = () => {
	const {isMobile, isMac} = useNavigator();

	if (isMobile) return null;

	return (
		<ClientOnly>
			{!isMobile && (
				<Slide>
					<div className="mt-4 text-gray-600 text-sm text-center">
						<LightbulbIcon className="h-4 inline mr-1" />
						<span className="font-semibold">ProTip!</span> Type{' '}
						<KeyboardShortcut>
							{isMac ? 'cmd' : 'ctrl'} + c
						</KeyboardShortcut>{' '}
						to fast-copy generated password
					</div>
				</Slide>
			)}
		</ClientOnly>
	);
};

export default PasswordGenerator;
