import {NextPageContext} from 'next';
import React from 'react';
import {ErrorProps} from 'next/error';

const Error = ({statusCode}: ErrorProps): JSX.Element => {
	return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>;
};

Error.getInitialProps = ({res, err}: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return {statusCode};
};

export default Error;
