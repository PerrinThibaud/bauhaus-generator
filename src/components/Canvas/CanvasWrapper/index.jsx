import React from 'react';
import PropTypes from 'prop-types';

function CanvasWrapper({ imageSize: { width: imgWidth, height: imgHeight }, children }) {
  const calcWidth = imgWidth > imgHeight ? 500 : 500 / (imgHeight / imgWidth);
  const calcHeight = imgHeight > imgWidth ? 500 : 500 / (imgWidth / imgHeight);
  return (
    <div style={{
      position: 'relative', display: 'block', width: calcWidth || 0, height: calcHeight || 0,
    }}
    >
      {children}
    </div>
  );
}

CanvasWrapper.propTypes = {
  imageSize: PropTypes.exact({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default React.memo(CanvasWrapper);
