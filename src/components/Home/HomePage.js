import { useNavigate } from "react-router-dom";
import videoHomePage from "../../assest/video-homepage.mp4"
import { useSelector } from 'react-redux';

const HomePage = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate()

    return (
        <div className="homepage-container">
            <video autoPlay loop muted>
                <source src={videoHomePage} type="video/mp4" />
            </video>

            <div className="homepage-content">
                <div className="title1">There's a better way to ask</div>
                <div className="title2">Effortlessly co-create your forms with AI. Then keep improving them with AI insights.</div>
                {
                    isAuthenticated === false ?
                        <button className="btn btn-homepage" onClick={() => navigate('/login')}>Get's Started. It's free</button>
                        :
                        <button className="btn btn-homepage" onClick={() => navigate('/user')}>Start Now</button>
                }
            </div>
        </div>
    );
}

export default HomePage;