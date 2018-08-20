/**
 * @description 欢迎页工作栏
 * @author Vania
 * @since 2018-08-06
 */
import React, { PureComponent } from 'react';
import { SearchBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './toolbar.css';

class Toolbar extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div className={styles.container}>
          <SearchBar style={{backgroundColor:'#fff',border:'1px solid #eee',borderRadius:'5px'}} placeholder="请输入" ref={ref => this.autoFocusInst = ref} />
        </div>
      </div>
    )
  }
}

export default Toolbar;