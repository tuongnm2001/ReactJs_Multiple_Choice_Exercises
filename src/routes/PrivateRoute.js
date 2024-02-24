import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    if (!isAuthenticated) {
        toast.warning('Vui lòng đăng nhập để tiếp tục')
        return <Navigate to={'/login'} />
    }

    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoute;