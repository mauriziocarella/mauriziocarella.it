import axios, {type AxiosRequestConfig} from 'axios';

export const client = axios.create({});

export const isAxiosConfig = (
	config: Record<never, never>,
): config is AxiosRequestConfig => 'url' in config;

// client.interceptors.response.use((res) => res.data);

export default client;
