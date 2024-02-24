import { useNavigate } from "react-router-dom";
import videoHomePage from "../../assest/video-homepage.mp4"
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HomePage = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay loop muted>
                <source src={videoHomePage} type="video/mp4" />
            </video>

            <div className="homepage-content">
                <div className="title1">
                    {t('homepage.title1')}
                </div>

                <div className="title2">
                    {t('homepage.title2')}
                </div>
                {
                    isAuthenticated === false ?
                        <button className="btn btn-homepage" onClick={() => navigate('/login')}>
                            {t('homepage.btnHomepageLoggedIn')}
                        </button>
                        :
                        <button className="btn btn-homepage" onClick={() => navigate('/user')}>
                            {t('homepage.notLoggedInYet')}
                        </button>
                }
            </div>
        </div>
    );
}

export default HomePage;