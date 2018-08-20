/**
 * @description profile 标签
 * @author Vania
 * @since 2018-08-06
 */
import React from 'react';
import styles from './profile.css';

const Label = ({ text, style }) => (
  <a className={styles.label} style={style}> { text } </a>
)

export default Label 