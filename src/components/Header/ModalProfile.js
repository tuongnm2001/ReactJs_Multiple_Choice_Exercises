import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdateProfile from './UpdateProfile';
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

                        <Tab eventKey="ACCOUNT" title="ACCOUNT">
                            <UpdateProfile />
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                            Tab content for Profile
                        </Tab>
                        <Tab eventKey="contact" title="Contact">
                            Tab content for Contact
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProfile;