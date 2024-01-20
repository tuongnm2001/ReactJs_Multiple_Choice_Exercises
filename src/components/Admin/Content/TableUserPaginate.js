import { FaEye, FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {

    const { listUsers, pageCount, currentPage, setCurrentPage } = props;

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetAllUserWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    };

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
                                    <tr key={`user - ${index}`}>
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
                                <td colSpan={5} style={{ textAlign: "center" }}>
                                    <div className="spinner-border m-5" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                    }
                </tbody>
            </table >

            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />

            </div>
        </>

    );
}

export default TableUserPaginate;