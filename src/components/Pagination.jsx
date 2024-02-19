/*
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalPages, setPage } from '../redux/paginationSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button key={index} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import LibPagenate from '../lib/LibPagenate';

interface IProps {
  history:string[],
}
interface IState {
  data: any[],
  offset: number,
  perPage: number,
  pageCount: number,
}
interface IPropsComment {
  data: any[],
} 

const TestData = [
  {title: 'title-1', comment: 'commnet-1', username: 'user_1'},
  {title: 'title-2', comment: 'commnet-2', username: 'user_2'},
  {title: 'title-3', comment: 'commnet-3', username: 'user_3'},
  {title: 'title-4', comment: 'commnet-4', username: 'user_4'},
  {title: 'title-5', comment: 'commnet-5', username: 'user_5'},
  {title: 'title-6', comment: 'commnet-6', username: 'user_6'},
  {title: 'title-7', comment: 'commnet-7', username: 'user_7'},
  {title: 'title-8', comment: 'commnet-8', username: 'user_8'},
  {title: 'title-9', comment: 'commnet-9', username: 'user_9'},
  {title: 'title-10', comment: 'commnet-10', username: 'user_10'},
  {title: 'title-11', comment: 'commnet-11', username: 'user_11'},
  {title: 'title-12', comment: 'commnet-12', username: 'user_12'},
];

export class CommentList extends Component<IPropsComment> {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    let commentNodes = this.props.data.map(function (comment, index) {
      return (
        <li key={index} className="list-group-item">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{comment.comment}</h5>
          </div>
          <small>From {comment.username}.</small>
        </li>
      );
    });

    return (
      <div id="project-comments" className="commentList">
        <ul className="list-group">{commentNodes}</ul>
      </div>
    );
  }
}

export default class Demo extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      offset: 0,
      perPage: 10,
      pageCount: 0,
    };
  }
  componentDidMount() {
    LibPagenate.set_per_page(5);
    const n = LibPagenate.getMaxPage(TestData.length);
console.log(TestData.length, n);
    const d = LibPagenate.getPageStart(0);
//console.log(d);
//console.log(TestData.slice(d.start, d.end));
    this.setState({
      pageCount: n, data: TestData.slice(d.start, d.end),
    });
  }
  handlePageClick = (data: any) => {
    console.log('onPageChange', data);
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);
    const d = LibPagenate.getPageStart(selected);
//console.log(d);
    this.setState({
      offset: offset, data: TestData.slice(d.start, d.end) 
    });
  };
  render() {
    const currentPage = Math.round(this.state.offset / this.state.perPage);
    return (
      <div className="commentBox">
        <h3>Demo</h3>
        <hr />
        <CommentList data={this.state.data} />
        <nav aria-label="Page navigation comments" className="mt-4">
        <ReactPaginate
          pageCount={Math.ceil(this.state.books.length / this.state.perPage)} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
          marginPagesDisplayed={2} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
          pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
          onPageChange={this.pageChange} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
          containerClassName='pagination' //ページネーションリンクの親要素のクラス名
          pageClassName='page-item' //各子要素(li要素)のクラス名
          pageLinkClassName='page-link' //ページネーションのリンクのクラス名
          activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます 
          previousLabel='<' //前のページ番号に戻すリンクのテキスト
          nextLabel='>' //次のページに進むボタンのテキスト
          previousClassName='page-item' // '<'の親要素(li)のクラス名
          nextClassName='page-item' //'>'の親要素(li)のクラス名
          previousLinkClassName='page-link'  //'<'のリンクのクラス名
          nextLinkClassName='page-link'　//'>'のリンクのクラス名
          disabledClassName='disabled' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
          breakLabel='...' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
          breakClassName='page-item' // 上記の「…」のクラス名
          breakLinkClassName='page-link' // 「…」の中のリンクにつけるクラス
          />

        </nav>
        <hr className="my-4" />
      </div>
    );
  }  
}