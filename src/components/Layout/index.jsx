import React from 'react';
import PropTypes from 'prop-types';

import GitHubLogo from '../../assets/images/GitHub-Mark-32px.png';
import styles from './Layout.module.scss';

function Layout({ children }) {
  return (
    <div className={styles.Root}>
      <div className={styles.Header}><p>Bauhaus Generator</p></div>
      <div className={styles.Left}><p>©2022 Thibaud Perrin. All rights reserved</p></div>
      <div className={styles.Content}>
        { children }
      </div>
      <div className={styles.Right}><p>Thibaud Perrin</p></div>
      <div className={styles.Footer}>
        <a href="https://github.com/PerrinThibaud/bauhaus-generator" target="_blank" rel="noreferrer">
          <img src={GitHubLogo} alt="github mark" />
        </a>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default React.memo(Layout);
