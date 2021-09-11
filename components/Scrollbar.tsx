import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Scrollbar = ({...props}) => {
	return (
		<PerfectScrollbar {...props}/>
	);
}

export default Scrollbar;
