const CrossIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 256 256"
    >
      <defs>
        <linearGradient
          id={`cross-color-1`}
          x1="7.534"
          x2="27.557"
          y1="7.534"
          y2="27.557"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#696969"></stop>
          <stop
            offset="0.443"
            stopColor="#626061"
          ></stop>
          <stop offset="1" stopColor="#474747"></stop>
        </linearGradient>
        <linearGradient
          id={`cross-color-2`}
          x1="0"
          x2="1"
          y1="0"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#444"></stop>
          <stop offset="1" stopColor="#545353"></stop>
        </linearGradient>
      </defs>
      <g
        fill="none"
        strokeMiterlimit="10"
        fontFamily="none"
        fontSize="none"
        fontWeight="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <path
          fill={`url(#cross-color-1`}
          d="M42.42 12.401a1.98 1.98 0 000-2.802L38.401 5.58a1.98 1.98 0 00-2.802 0L24 17.179 12.401 5.58a1.98 1.98 0 00-2.802 0L5.58 9.599a1.98 1.98 0 000 2.802L17.179 24 5.58 35.599a1.98 1.98 0 000 2.802l4.019 4.019a1.98 1.98 0 002.802 0z"
          transform="scale(5.33333)"
        ></path>
        <path
          fill={`url(#cross-color-2`}
          d="M24 30.821L35.599 42.42a1.98 1.98 0 002.802 0l4.019-4.019a1.98 1.98 0 000-2.802L30.821 24z"
          transform="scale(5.33333)"
        ></path>
      </g>
    </svg>
  );
};

export default CrossIcon;
