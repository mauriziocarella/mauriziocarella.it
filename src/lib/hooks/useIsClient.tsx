import {useEffect, useState} from 'react';

const useIsServer = () => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);
	return isClient;
};

export default useIsServer;
