// Pagination.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../actions/actions';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../Slice/paginationSlice'; // 修正

const Pagination = ({ totalItems, itemsPerPage }) => {
  const currentPage = useSelector((state) => {
    console.log(state)
  });
  const dispatch = useDispatch();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
  dispatch(setCurrentPage(page.selected)); // 選択されたページインデックスを直接使用
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
