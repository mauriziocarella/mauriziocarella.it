import {useSyncExternalStore} from 'react';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const useIsClient = () =>
	useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

export default useIsClient;
