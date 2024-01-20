import { FaEye, FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";

const TableUser = (props) => {

    const { listUsers } = props;

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 ?
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`user-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.username}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button
                                                className="btn btn-info "
                                                onClick={() => props.handleClickViewUser(item)}
                                            >
                                                <FaEye /> View
                                            </button>

                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => props.handleClickUpdateUser(item)}
                                            >
                                                <FaUserEdit /> Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => { props.handleClickDeleteUser(item) }}
                                            >
                                                <AiOutlineUserDelete /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center" }}>Not Found Users</td>
                            </tr>
                    }
                </tbody>
            </table>
        </>

    );
}

export default TableUser;