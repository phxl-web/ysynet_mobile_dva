/** 
 * @description 个人名片组件
 * @author Vania
 * @since 2018-08-06
 * @example 
 *    <Profile avatar={} title={} extra={} tags={} onRightClick={} onLeftClick={}/>
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './profile.css';
import _ from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode ,faSearch,faChevronRight,  } from '@fortawesome/free-solid-svg-icons'
library.add(faQrcode,faSearch,faChevronRight )

class Profile extends PureComponent {
  static propTypes = {
    avatar: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.element
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.element
    ]),
    tag: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    style: PropTypes.object,
    theme: PropTypes.string
  };
  render() {
    const {  avatar, title, extra, tag, onRightClick } = this.props;
   // const src = theme === 'dark' ? require(`../../assets/image/arrow_dark.svg`) : require(`../../assets/image/arrow_light.svg`)
    return (
      <div className={styles.header}>
      <div className={styles.left}>
          <div className={styles.head}>
            <img
            alt={title}
            src={ avatar || require('../../assets/image/user.png')}  
            className={styles.portrait} />
          </div>
          <div className={styles.text}>
            <div>
              <strong>{ title }</strong>
              <span> { tag } </span>
            </div>
            <p> { extra } </p>
          </div>
      </div>
      <div className={styles.right}>
        {
          onRightClick && _.isFunction(onRightClick) ? 
          <FontAwesomeIcon icon="chevron-right" onClick={onRightClick}/>
          : null
        }
      </div>  
    </div>
    )
  }
}

export default Profile;