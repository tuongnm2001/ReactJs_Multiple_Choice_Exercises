import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableQuiz = (props) => {

    const { fetchAllQuiz } = props;
    const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false)
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState([])


    const handleShowModalDelete = (quiz) => {
        setDataDeleteQuiz(quiz);
        setIsShowModalDeleteQuiz(true)
    }

    const handleShowModalEdit = () => {
        alert('Edit')
    }

    return (
        <>
            <table className="table table table-hover table-bordered mb-5">
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
                        props.listQuiz && props.listQuiz.length > 0 &&
                        props.listQuiz.map((item, index) => {
                            return (
                                <tr key={`listQuiz-${index}`}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => handleShowModalEdit()}
                                        >
                                            <FaUserEdit /> Edit
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleShowModalDelete(item)}
                                        >
                                            <AiOutlineUserDelete /> Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <ModalDeleteQuiz
                show={isShowModalDeleteQuiz}
                setShow={setIsShowModalDeleteQuiz}
                dataDeleteQuiz={dataDeleteQuiz}
                fetchAllQuiz={fetchAllQuiz}
            />
        </>
    );
}

export default TableQuiz;