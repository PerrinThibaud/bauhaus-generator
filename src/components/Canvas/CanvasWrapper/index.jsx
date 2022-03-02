import React from 'react';
import PropTypes from 'prop-types';

function CanvasWrapper({ imageSize: { width: imgWidth, height: imgHeight }, children }) {
  const ratio1 = imgWidth / imgHeight;
  const ratio2 = imgHeight / imgWidth;
  const calcWidth = imgWidth > imgHeight ? 500 : 500 * ratio1;
  const calcHeight = imgHeight > imgWidth ? 500 : 500 * ratio2;
  console.log(calcWidth, calcHeight);
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
