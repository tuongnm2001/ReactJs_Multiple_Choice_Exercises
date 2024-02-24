import { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import imgEN from '../../assest/united-kingdom.png'
import imgVI from '../../assest/vietnam.png'
import './Language.scss'

const Language = (props) => {

    const { t, i18n } = useTranslation();
    const [show, setShow] = useState(false);

    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <NavDropdown
            title={i18n.language === 'vi' ? (
                <>
                    <img src={imgVI} alt="Vietnam" className="flag-icon" width={20} />
                    <span className='vi'>Việt Nam</span>
                </>
            ) : (
                <>
                    <img src={imgEN} alt="English" className="flag-icon" width={20} />
                    <span className='en'>English</span>
                </>
            )}
            id="collasible-nav-dropdown"
            className='languages'
            show={show}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
            autoClose
        >
            <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>
                <img
                    src={imgEN}
                    width="20"
                    className="d-inline-block align-bottom"
                    alt="React Bootstrap logo" /> English
            </NavDropdown.Item>

            <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>
                <img
                    src={imgVI}
                    width="20"
                    className="d-inline-block align-bottom"
                    alt="React Bootstrap logo" /> Việt Nam
            </NavDropdown.Item>

        </NavDropdown>
    );
}

export default Language;