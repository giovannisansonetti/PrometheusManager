import * as React from "react";

// By: bx
// See: https://v0.app/icon/bx/time
// Example: <IconBxTime width="24px" height="24px" style={{color: "#dd9755"}} />

export const IconBxTime = ({
  height = "1em",
  fill = "#dd9755",
  focusable = "false",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8"
    />
    <path fill={fill} d="M13 7h-2v6h6v-2h-4z" />
  </svg>
);
