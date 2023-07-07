import React from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
export default React.forwardRef(function _Image(props: ImageProps, ref: React.Ref<HTMLImageElement> | undefined) {
  return <img ref={ref} {...props} />;
});
