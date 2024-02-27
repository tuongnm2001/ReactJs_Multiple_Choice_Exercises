import './ModalProfile.scss'
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import accountProfile from '../../assest/accountProfile.png'
import sercurityPassword from '../../assest/sercurity.png'
import history from '../../assest/history.png'
import History from './History';

const ModalProfile = (props) => {

    const { show, setShow } = props

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="ACCOUNT"
                        className="mb-3"
                    >

                        <Tab eventKey="ACCOUNT" title={<span className='imgProfile'><img src={accountProfile} alt="Account" /> ACCOUNT</span>}>
                            <UpdateProfile />
                        </Tab>

                        <Tab eventKey="profile" title={<span className='imgProfile'><img src={sercurityPassword} alt="Account" /> SECURITY</span>}>
                            <ChangePassword />
                        </Tab>

                        <Tab eventKey="contact" title={<span className='imgProfile'><img src={history} alt="Account" /> HISTORY</span>}>
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProfile;