import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";

const TableQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchAllQuiz()
    }, []);

    const fetchAllQuiz = async () => {
        let res = await getAllQuizForAdmin();
        setListQuiz(res.DT)
    }

    return (
        <table className="table table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Level</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    listQuiz && listQuiz.length > 0 &&
                    listQuiz.map((item, index) => {
                        return (
                            <tr key={`listQuiz-${index}`}>
                                <th>{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button className="btn btn-warning mx-3">
                                        <FaUserEdit /> Edit
                                    </button>
                                    <button className="btn btn-danger">
                                        <AiOutlineUserDelete /> Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    );
}

export default TableQuiz;