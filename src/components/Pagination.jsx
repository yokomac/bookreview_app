import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../actions/actions';
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalItems, itemsPerPage }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    dispatch(setPage(page.selected + 1));
  };

  console.log(currentPage);

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={handlePageChange}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};

export default Pagination;
