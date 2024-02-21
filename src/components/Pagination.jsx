import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, selectCurrentPage, selectTotalPages } from '../Slice/paginationSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;