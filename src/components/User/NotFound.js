import { useNavigate } from 'react-router-dom';
import './NotFound.scss'


const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="page-not-found pt-5">
            <div className="bg-light shadow">
                <h2>404</h2>
                <h3 className="mt-4">Opps! Page Not Found</h3>
                <p>Sorry, the page you visited does not exist.</p>
                <div className="mt-5">
                    <button
                        onClick={() => navigate('/')}
                        type="button"
                        className="btn m-2 m-md-0 btn-primary"
                    >
                        <i className="bi bi-house-door-fill"></i> Back Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;