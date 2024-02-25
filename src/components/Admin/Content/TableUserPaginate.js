import { FaEye, FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next';

const TableUserPaginate = (props) => {

    const { listUsers, pageCount, currentPage, setCurrentPage } = props;
    const { t } = useTranslation();

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetAllUserWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
        // console.log(`User requested page number ${event.selected}`);
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Email</th>
                        <th scope="col">{t('tableUser.username')}</th>
                        <th scope="col">{t('tableUser.role')}</th>
                        <th scope="col">{t('tableUser.actions')}</th>
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
                                                <FaEye /> {t('tableUser.view')}
                                            </button>

                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => props.handleClickUpdateUser(item)}
                                            >
                                                <FaUserEdit /> {t('tableUser.edit')}
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => { props.handleClickDeleteUser(item) }}
                                            >
                                                <AiOutlineUserDelete /> {t('tableUser.delete')}
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
            </table>

            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<<"
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