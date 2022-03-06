import React from 'react';
import PropTypes from 'prop-types';

import styles from './UploadFile.module.scss';

// Component that manage the upload of a new photo
function UploadFile({ setImage, setImageSize }) {
  // Function that load an image from the input
  const handleDataChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = new Image();
      img.src = URL.createObjectURL(event.target.files[0]);
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className={styles.Root} onChange={handleDataChange}>
      <div className={styles.Wrapper}>
        <span />
        <span />
        <span />
        <span />
        <input type="file" name="picture" id="picture" accept="image/png, image/jpeg" />
      </div>
    </div>
  );
}

UploadFile.propTypes = {
  setImage: PropTypes.func,
  setImageSize: PropTypes.func,
};

UploadFile.defaultProps = {
  // eslint-disable-next-line no-console
  setImage: () => { console.error('Upload function is not implemented'); },
  // eslint-disable-next-line no-console
  setImageSize: () => { console.error('Image size function is not implemented'); },
};

export default React.memo(UploadFile);
