/**
 * @file 下滑刷新 - 组件二次封装
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListView, PullToRefresh } from 'antd-mobile';
import promiseRequest from '../../utils/promise_request'
import _ from 'lodash';

const NUM_ROWS = 10;
let pageIndex = 1;

class ListViewScroll extends Component {
  total = 0;
  data = [];
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      queryParams: this.props.queryParams
    };
  }
  async componentDidMount() {
    const h = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    this.rData = await this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      height: h,
      refreshing: false,
      isLoading: false,
    })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_.isEqual(nextProps.queryParams, prevState.queryParams)) {
      return {
        queryParams: nextProps.queryParams,
      };
    }
    return null
  }
  componentDidUpdate = (prevProps, prevState) => {
    document.body.style.overflow = 'hidden';

    if (!_.isEqual(prevProps.queryParams, this.state.queryParams)) {
      this.onRefresh();
    }
  }

  // 获取数据
  genData = async (queryParams, pIndex = 0, isScroll) => {
    const dataArr = [];
    const query = { ...queryParams };
    const promiseData = await promiseRequest(`${this.props.url}`, {
      body: {
        pagesize: NUM_ROWS,
        page: pIndex,
        ...query
      },
      type: 'formData'
    });
    const data = promiseData.result.rows || promiseData.result;
    this.total = promiseData.result.total;
    const dataSource = isScroll ? [...this.data, ...data] : data;
    for (let i = 0; i < data.length; i++) {
      dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    this.data = dataSource;
    return dataArr;
  }

  // 上拉刷新
  onRefresh = async () => {
    pageIndex = 1;
    this.setState({ refreshing: true });
    this.rData = await this.genData(this.state.queryParams, pageIndex, false);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      refreshing: false
    });
  };

  // 滚动加载
  onEndReached = async (event) => {
    if (++pageIndex > this.total) return;
    this.setState({ isLoading: true });
    const newData = await this.genData(this.state.queryParams, pageIndex, true);
    this.rData = [...this.rData, ...newData];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  render() {
    const { dataSource } = this.state;
    const { data } = this;
    const row = (rowData, sectionID, rowID, highlightRow) => {
      const obj = data[rowID];
      return (
        <this.props.item {...obj} />
      );
    };
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    return (
      <ListView
        key={'1'}
        ref={el => this.lv = el}
        dataSource={dataSource}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : '加载完成'}
          </div>
        )}
        renderRow={row}
        style={{
          // minHeight: 'calc(100vh - 5px)',
          border: '1px solid #ddd',
          margin: '5px 0',
          overflowX: 'hidden',
          height: this.state.height - 100,
        }}
        renderSeparator={separator}
        pullToRefresh={
          <PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        pageSize={4}
      />
    );
  }
}

export default ListViewScroll;
