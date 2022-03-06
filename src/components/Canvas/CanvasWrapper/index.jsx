import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

function CanvasWrapper({ imageSize: { width: imgWidth, height: imgHeight }, appSize: { width: appWidth, height: appHeight }, children }) {
  // ratio of the uploaded image
  const ratio = useMemo(() => imgWidth / imgHeight, [imgHeight, imgWidth]);
  const calW1 = useMemo(() => appWidth, [appWidth]);
  const calH1 = useMemo(() => appWidth / ratio, [appWidth, ratio]);
  const calW2 = useMemo(() => appHeight * ratio, [appHeight, ratio]);
  const calH2 = useMemo(() => appHeight, [appHeight]);

  const calcSize = calW1 <= appWidth && calH1 <= appHeight ? { width: calW1, height: calH1 } : { width: calW2, height: calH2 };
  return (
    <div style={{
      position: 'relative', display: 'block', width: calcSize?.width || 0, height: calcSize?.height || 0,
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
  appSize: PropTypes.exact({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(CanvasWrapper);
