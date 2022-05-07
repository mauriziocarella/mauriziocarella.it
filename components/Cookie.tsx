import {useEffect, useState} from "react";
import ReactGA from "react-ga4";
import Cookies from "universal-cookie";

export const Cookie = () => {
	const [visible, setVisible] = useState(false);

	const init = () => {
		if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
			ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
		}

		setVisible(false)

		try {
			sessionStorage.setItem('cookie', 'true');
		} catch (e) {
			console.error(e)
		}
	};

	const clear = () => {
		const cookies = new Cookies();
		cookies.remove('_ga');
		cookies.remove('_gat');
		cookies.remove('_gid');

		setVisible(false)
	};

	useEffect(() => {
		try {
			const cookieAccept = sessionStorage.getItem('cookie');
			if (cookieAccept === "true") {
				init()
			}
			else {
				setVisible(true);
			}
		} catch (e) {
			console.error(e)
			setVisible(true);
		}
	}, []);

	if (!visible) return null;

	return (
		<div className="fixed bottom-0 inset-x-0 flex flex-col sm:flex-row justify-center sm:justify-start sm:items-center bg-neutral text-neutral-content shadow-lg px-8 py-6">
			<div className="flex-grow text-lg py-4">This website uses cookies to enhance the user experience.</div>
			<div className="flex justify-end sm:justify-center items-center space-x-2">
				<button
					type="button"
					className="px-4 py-2 bg-error text-error-content hover:bg-error-focus transition-colors rounded shadow"
					onClick={clear}
				>
					Decline
				</button>
				<button
					type="button"
					className="px-4 py-2 bg-success text-success-content hover:bg-success-focus transition-colors rounded shadow"
					onClick={init}
				>
					Accept
				</button>
			</div>
		</div>
	);
}
