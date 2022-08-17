import {NextPageContext} from 'next';
import React, {useMemo} from 'react';
import {EmojiSadIcon} from '@heroicons/react/outline';

type ErrorProps = {
	code: number;
	message: string;
};
const Error = ({code, ...props}: ErrorProps) => {
	const message = useMemo(() => {
		if (props.message) return props.message;

		switch (code) {
			case 404:
				return 'Page not found';
		}
	}, [code, props.message]);

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="text-center max-w-lg space-y-4">
				<EmojiSadIcon className="w-32 inline-block" />

				<div className="font-medium text-2xl">Something gone wrong</div>

				<div className="font-light tracking-wide">
					{message} ({code})
				</div>

				<a className="inline-block text-sm" href="/">
					mauriziocarella.it
				</a>
			</div>
		</div>
	);
};

Error.getInitialProps = ({res, err}: NextPageContext) => {
	const code = res?.statusCode || err?.statusCode;
	const message = res?.statusMessage || err?.message;
	return {code, message};
};

export default Error;
