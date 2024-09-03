import * as React from "react";

// By: ion
// See: https://v0.app/icon/ion/copy
// Example: <IconIonCopy width="24px" height="24px" style={{color: "#c2c2c2"}} />

export const IconIonCopy = ({
  height = "1em",
  fill = "#c2c2c2",
  focusable = "false",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      d="M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72"
    />
    <path
      fill={fill}
      d="M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80"
    />
  </svg>
);
