/**
 * @description 自定义CardInfo title
 * @author Vania
 * @since 2018-08-06
 */
import React, { PureComponent } from 'react';
import styles from './card_title.css';
import PropTypes from 'prop-types';
// import { Icon } from 'antd-mobile';
class CardTitle extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }
  render() {
    const { title } = this.props;
    return (
      <div className={styles.wrapper}>
        <span>{ title }</span>
        {/* <span className={styles.more} onClick={onClick}>
          更多
          <Icon type="right" className={styles.icon}/>
        </span> */}
      </div>
    )
  }
}

export default CardTitle;