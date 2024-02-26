import React, { forwardRef, useState } from "react";
import images from "../../assets/images/index";

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallBack: customFallBack = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallBack, setFallBack] = useState("");

    const handlerError = () => {
      setFallBack(customFallBack);
    };

    return (
      <img
        ref={ref}
        src={fallBack || src}
        alt={alt}
        className={className}
        {...props}
        onError={handlerError}
      />
    );
  }
);

export default Image;
