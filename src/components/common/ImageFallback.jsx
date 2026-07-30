import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

export default function ImageFallback({
  src,
  alt = '',
  label = 'Image Preview',
  className = '',
  imageClassName = '',
}) {
  const [hasError, setHasError] = useState(false);


  if (!src || hasError) {
    return (
      <ImagePlaceholder
        label={label}
        className={className}
      />
    );
  }


  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`
        ${className}
        ${imageClassName}
      `}
    />
  );
}