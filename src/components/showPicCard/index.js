import React , { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import styles from './style.css';
import PropTypes from 'prop-types';

class ShowPicCard extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
  }
  // handleZoom = (e)=>{
  //   console.log(e,'123')
  // }

  render() {
    const { title ,url,style} = this.props;
    return (
       <div className={styles.container}>
           {
             title ? 
             <fieldset className={styles.fieldset}>
             <legend className={styles.legend}>
             <span>{title}</span>
             </legend>
             </fieldset>
             :null

           }
            <Carousel
              autoplay={false}
              dots={false}
              infinite
              style={style}
            >
              <img
                // onClick={this.handleZoom}
                src={url}
                alt={title}
                style={{ width: '100%', verticalAlign: 'top'}}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  
                }}
              />
            </Carousel>
       </div>
    );
  }
}
export default ShowPicCard;