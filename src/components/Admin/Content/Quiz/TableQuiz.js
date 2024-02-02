import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalEditQuiz from "./ModalEditQuiz";
import { FaEye } from "react-icons/fa";
import ModalViewQuiz from "./ModalViewQuiz";

const TableQuiz = (props) => {

    const { fetchAllQuiz } = props;
    const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false)
    const [isShowModalEditQuiz, setIsShowModalEditQuiz] = useState(false)
    const [isShowModalViewQuiz, setIsShowModalViewQuiz] = useState(false)
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState([])
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState([])
    const [dataViewQuiz, setDataViewQuiz] = useState([])

    const handleShowModalDelete = (dataDelete) => {
        setIsShowModalDeleteQuiz(true)
        setDataDeleteQuiz(dataDelete);
    }
    const handleShowModalEdit = (dataUpdate) => {
        setIsShowModalEditQuiz(true)
        setDataUpdateQuiz(dataUpdate)
    }

    const handleShowModalView = (dataView) => {
        setIsShowModalViewQuiz(true)
        setDataViewQuiz(dataView)
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
                                            className="btn btn-info"
                                            onClick={() => handleShowModalView(item)}
                                        >
                                            <FaEye /> View
                                        </button>

                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => handleShowModalEdit(item)}
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

            <ModalEditQuiz
                show={isShowModalEditQuiz}
                setShow={setIsShowModalEditQuiz}
                dataUpdateQuiz={dataUpdateQuiz}
                fetchAllQuiz={fetchAllQuiz}
            />

            <ModalViewQuiz
                dataViewQuiz={dataViewQuiz}
                show={isShowModalViewQuiz}
                setShow={setIsShowModalViewQuiz}
            />
        </>
    );
}

export default TableQuiz;