import axios from "axios";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiService";

const TableUser = () => {

    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetAllUser()
    }, [])

    const fetAllUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
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
                                        <td>{index + 1}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button className="btn btn-info">View</button>
                                            <button className="btn btn-warning mx-3">Edit</button>
                                            <button className="btn btn-danger">Delete</button>
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