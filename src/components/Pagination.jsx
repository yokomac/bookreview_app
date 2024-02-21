import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, selectCurrentPage, selectTotalPages } from '../Slice/paginationSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <nav aria-label="...">
      <ul class="pagination justify-content-center">

        <li class="page-item">
          <span onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} class="page-link">Prev</span>
        </li>

        <li class="page-item" aria-current="page"><span class="page-link">{` Page ${currentPage} `}</span></li>

        <li class="page-item">
          <span  onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} class="page-link">Next</span>
        </li>

    </ul>
    </nav>
  );
};

export default Pagination;