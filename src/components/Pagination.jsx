/*
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../actions/actions'; // これによりアクションをインポートする
import './Pagination.css';

const Pagination = ({ sum, per }) => {
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const dispatch = useDispatch();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      dispatch(setPage(currentPage));
    }
    isFirstRender.current = false;
  }, [currentPage, dispatch]);

  const totalPage = Math.ceil(sum / per);

  const handleBack = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleForward = () => {
    if (currentPage < totalPage) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handleMove = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="pagination">
      {totalPage !== 0 && (
        <>
          <span onClick={handleBack}>＜</span>
          <ul>
            {[...Array(totalPage).keys()].map((page) => (
              <li
                key={page + 1}
                onClick={() => handleMove(page + 1)}
                className={page + 1 === currentPage ? "active" : ""}
              >
                {page + 1}
                {page + 1 === currentPage && " active"}
              </li>
            ))}
          </ul>
          <span onClick={handleForward}>＞</span>
        </>
      )}
    </div>
  );
};

Pagination.propTypes = {
  sum: PropTypes.number.isRequired,
  per: PropTypes.number.isRequired,
};

export default Pagination;
*/

import ReactPaginate from 'react-paginate';

let setStateOfSelectPage;

const Pagination = (props) => {
  const { listLength, displayCount, setStateInfoAction } = props; 
  setStateOfSelectPage = setStateInfoAction;

  return (
    <>
      <ReactPaginate
        style={{ marginTop: 10, marginBottom: 100 }}
        pageCount={pageCountCalc(listLength, displayCount)}
        marginPagesDisplayed={5}
        pageRangeDisplayed={10}
        onPageChange={handlePageClick}
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousLabel='<'
        nextLabel='>'
        previousClassName='page-item'
        nextClassName='page-item'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        disabledClassName='disabled'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
      />
    </>
  );
}

const handlePageClick = page => {
  setStateOfSelectPage(page.selected, 'selectPage');
  window.scrollTo(0, 50);
};

const pageCountCalc = (len, count) => {
  if (len < count) {
    return 1;
  }
  return Math.ceil(len / count);
};

export default Pagination;