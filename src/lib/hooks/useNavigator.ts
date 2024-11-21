import {useMemo} from 'react';

const useNavigator = () => {
	const isMobile = useMemo(
		() =>
			typeof window !== 'undefined' &&
			(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
				(navigator as any)?.userAgentData?.mobile),
		[],
	);
	const isMac = useMemo(
		() =>
			typeof window !== 'undefined' &&
			/(Mac|iPhone|iPod|iPad)/i.test(
				(navigator as any)?.userAgentData?.platform ||
					navigator?.platform ||
					'unknown',
			),
		[],
	);

	return {
		isMobile,
		isMac,
	};
};

export default useNavigator;
