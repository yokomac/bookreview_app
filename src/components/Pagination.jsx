import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, selectCurrentPage, selectTotalPages } from '../Slice/paginationSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const handlePageChange = (newPage) => {
    if (newPage >= 0) { // 0ページも許容するように修正
      dispatch(setPage(newPage));
    }
  };

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">

        <li className="page-item">
          <span onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="page-link">Prev</span>
        </li>

        <li className="page-item" aria-current="page"><span className="page-link">{` Page ${currentPage} `}</span></li>

        <li className="page-item">
          <span  onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;