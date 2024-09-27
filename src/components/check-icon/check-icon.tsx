const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 256 256"
    >
      <defs>
        <linearGradient
          id={`check-color-1`}
          x1="21.241"
          x2="3.541"
          y1="39.241"
          y2="21.541"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.108"
            stopColor="#000000"
          ></stop>
          <stop
            offset="0.433"
            stopColor="#504f4f"
          ></stop>
        </linearGradient>
        <linearGradient
          id={`check-color-2`}
          x1="44.41"
          x2="14.59"
          y1="9.59"
          y2="39.411"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#777"></stop>
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
          fill={`url(#check-color-1`}
          d="M16.599 41.42L1.58 26.401a1.98 1.98 0 010-2.802l4.019-4.019a1.98 1.98 0 012.802 0L23.42 34.599a1.98 1.98 0 010 2.802l-4.019 4.019a1.983 1.983 0 01-2.802 0z"
          transform="scale(5.33333)"
        ></path>
        <path
          fill={`url(#check-color-2`}
          d="M12.58 34.599L39.599 7.58a1.98 1.98 0 012.802 0l4.019 4.019a1.98 1.98 0 010 2.802L19.401 41.42a1.98 1.98 0 01-2.802 0l-4.019-4.019a1.983 1.983 0 010-2.802z"
          transform="scale(5.33333)"
        ></path>
      </g>
    </svg>
  );
};

export default CheckIcon;
