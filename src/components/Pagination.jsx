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
