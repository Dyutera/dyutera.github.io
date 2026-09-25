export default function ArchitectureVisual() {
  return (
    <div
      className="architecture-visual"
      role="img"
      aria-label="Connected layers of a digital product, from idea and design to code and deployment"
    >
      <div className="visual-glow" />
      <svg
        className="architecture-svg"
        viewBox="0 0 620 550"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="plate"
            x1="200"
            y1="180"
            x2="420"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#493981" />
            <stop offset="1" stopColor="#181827" />
          </linearGradient>
          <linearGradient
            id="topPlate"
            x1="200"
            y1="140"
            x2="400"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ac8dff" />
            <stop offset=".48" stopColor="#7c55e5" />
            <stop offset="1" stopColor="#513098" />
          </linearGradient>
          <linearGradient
            id="side"
            x1="170"
            y1="240"
            x2="450"
            y2="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6540bf" />
            <stop offset=".5" stopColor="#38205f" />
            <stop offset="1" stopColor="#8055d4" />
          </linearGradient>
          <linearGradient
            id="beam"
            x1="310"
            y1="90"
            x2="310"
            y2="330"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b394ff" stopOpacity="0" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity=".17" />
          </linearGradient>
          <filter id="light">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <pattern
            id="grid"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path d="M44 0H0V44" stroke="#7a659e" strokeOpacity=".12" />
          </pattern>
        </defs>
        <g transform="translate(310 305) scale(1 .48) rotate(45)">
          <rect x="-250" y="-250" width="500" height="500" fill="url(#grid)" />
        </g>
        <path
          d="M70 344 190 413 310 344 447 424 553 363M69 249l111-64M463 200l85 49v83M310 432v49"
          stroke="#625180"
          strokeOpacity=".6"
          strokeDasharray="4 6"
        />
        <path
          d="m160 346 150-86 150 86v18l-150 87-150-87Z"
          fill="#151220"
          stroke="#4c3a72"
        />
        <path d="m160 346 150 87 150-87M310 433v18" stroke="#5e468f" />
        <path
          d="m160 304 150-86 150 86v18l-150 87-150-87Z"
          fill="url(#plate)"
          stroke="#6f50a5"
        />
        <path d="m160 304 150 87 150-87M310 391v18" stroke="#8e6acf" />
        <path
          d="m173 269 137-79 137 79v19l-137 80-137-80Z"
          fill="url(#side)"
          stroke="#9d73ed"
        />
        <path d="m173 269 137 80 137-80M310 349v19" stroke="#b391ff" />
        <path d="M173 84 310 5l137 79v185l-137 80-137-80Z" fill="url(#beam)" />
        <g className="floating-plate">
          <path
            d="m173 222 137-79 137 79v18l-137 80-137-80Z"
            fill="url(#side)"
            stroke="#bb9cf8"
          />
          <path
            d="m173 222 137-79 137 79-137 80Z"
            fill="url(#topPlate)"
            stroke="#c6a6ff"
          />
          <path
            d="m220 222 90-51 90 51-90 52Z"
            stroke="#d2baff"
            strokeOpacity=".3"
          />
          <path
            d="m270 223 26-15m-26 15 26 15m54-30 26 15-26 15m-24-41-12 53"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <path
          d="m160 304 150 87 150-87"
          stroke="#b792ff"
          strokeWidth="3"
          filter="url(#light)"
          opacity=".65"
        />
        <g fill="#c8b0ff">
          <circle cx="70" cy="344" r="4" />
          <circle cx="553" cy="363" r="4" />
          <circle cx="310" cy="481" r="4" />
          <circle cx="463" cy="200" r="3" />
          <circle cx="69" cy="249" r="3" />
        </g>
        <path
          d="M122 126h35m-17-17v35M488 426h16m-8-8v16"
          stroke="#8d73b6"
          strokeOpacity=".6"
        />
      </svg>
      <div className="visual-label label-code">
        <span className="label-icon">&lt;/&gt;</span>
        <div>
          Clean code<span>Built to last.</span>
        </div>
        <span className="tiny-dot" />
      </div>
      <div className="visual-label label-design">
        <span className="label-icon">✧</span>
        <div>
          Thoughtful design<span>Made for people.</span>
        </div>
      </div>
      <div className="visual-label label-build">
        <span className="live-dot" />
        <span>Turning possibility into reality</span>
      </div>
      <span className="visual-coordinate">DY / ENGINEERED WITH PURPOSE</span>
    </div>
  );
}
