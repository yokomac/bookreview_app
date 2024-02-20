import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, booksPerPage, totalBooks, onPageChange }) => {
  const pageNumbers = [];

  // ページ数を計算
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <BootstrapPagination>
      {pageNumbers.map((number) => (
        <BootstrapPagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </BootstrapPagination.Item>
      ))}
    </BootstrapPagination>
  );
};

export default Pagination;
