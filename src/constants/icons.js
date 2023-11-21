export const DesktopApp = () => (
  <svg width='28' data-e2e='' height='28' fill='currentColor' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>
    <path d='M34.68 6H13.32c-1.05 0-1.96 0-2.71.06-.8.07-1.58.2-2.33.6a6 6 0 0 0-2.63 2.62 6.1 6.1 0 0 0-.59 2.33C5 12.36 5 13.27 5 14.32V36H0v1a3 3 0 0 0 3 3h21v-6H9V14.4c0-1.15 0-1.9.05-2.46.04-.55.12-.75.17-.85a2 2 0 0 1 .87-.87c.1-.05.3-.13.85-.17A34 34 0 0 1 13.4 10h29.24a6 6 0 0 0-2.92-3.35 6.1 6.1 0 0 0-2.33-.59C36.64 6 35.73 6 34.68 6Z'></path>
    <path d='M48 18a6 6 0 0 0-6-6h-8a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V18Zm-16 0c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V18Z'></path>
  </svg>
)

export const MessageIcon = () => (
  <svg width='1em' data-e2e='' height='1em' viewBox='0 0 48 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2.17877 7.17357C2.50304 6.45894 3.21528 6 4.00003 6H44C44.713 6 45.372 6.37952 45.7299 6.99615C46.0877 7.61278 46.0902 8.37327 45.7365 8.99228L25.7365 43.9923C25.3423 44.6821 24.5772 45.0732 23.7872 44.9886C22.9972 44.9041 22.3321 44.3599 22.0929 43.6023L16.219 25.0017L2.49488 9.31701C1.97811 8.72642 1.85449 7.88819 2.17877 7.17357ZM20.377 24.8856L24.531 38.0397L40.5537 10H8.40757L18.3918 21.4106L30.1002 14.2054C30.5705 13.9159 31.1865 14.0626 31.4759 14.533L32.5241 16.2363C32.8136 16.7066 32.6669 17.3226 32.1966 17.612L20.377 24.8856Z'
    ></path>
  </svg>
)

export const InboxIcon = () => (
  <svg width='32' data-e2e='' height='32' viewBox='0 0 32 32' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24.0362 21.3333H18.5243L15.9983 24.4208L13.4721 21.3333H7.96047L7.99557 8H24.0009L24.0362 21.3333ZM24.3705 23.3333H19.4721L17.2883 26.0026C16.6215 26.8176 15.3753 26.8176 14.7084 26.0026L12.5243 23.3333H7.62626C6.70407 23.3333 5.95717 22.5845 5.9596 21.6623L5.99646 7.66228C5.99887 6.74352 6.74435 6 7.66312 6H24.3333C25.2521 6 25.9975 6.7435 26 7.66224L26.0371 21.6622C26.0396 22.5844 25.2927 23.3333 24.3705 23.3333ZM12.6647 14C12.2965 14 11.998 14.2985 11.998 14.6667V15.3333C11.998 15.7015 12.2965 16 12.6647 16H19.3313C19.6995 16 19.998 15.7015 19.998 15.3333V14.6667C19.998 14.2985 19.6995 14 19.3313 14H12.6647Z'
    ></path>
  </svg>
)

export const MoreIcon = () => (
  <svg width='1em' data-e2e='' height='1em' viewBox='0 0 48 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24 4C26.2091 4 28 5.79086 28 8C28 10.2091 26.2091 12 24 12C21.7909 12 20 10.2091 20 8C20 5.79086 21.7909 4 24 4ZM24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24C20 21.7909 21.7909 20 24 20ZM24 36C26.2091 36 28 37.7909 28 40C28 42.2091 26.2091 44 24 44C21.7909 44 20 42.2091 20 40C20 37.7909 21.7909 36 24 36Z'
    ></path>
  </svg>
)

export const HomeIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox='0 0 48 48'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M23.0484 7.84003C23.6014 7.38666 24.3975 7.38666 24.9504 7.84001L41.051 21.04C41.5411 21.4418 41.7258 22.1082 41.5125 22.705C41.2991 23.3017 40.7338 23.7 40.1 23.7H37.769L36.5769 36.7278C36.4592 38.0149 35.3798 39 34.0873 39H13.9127C12.6202 39 11.5409 38.0149 11.4231 36.7278L10.231 23.7H7.89943C7.2657 23.7 6.70035 23.3017 6.487 22.705C6.27364 22.1083 6.45833 21.4418 6.9484 21.04L23.0484 7.84003ZM23.9995 10.9397L12.0948 20.7H12.969L14.369 36H22.4994V28.3138C22.4994 27.7616 22.9471 27.3138 23.4994 27.3138H24.4994C25.0517 27.3138 25.4994 27.7616 25.4994 28.3138V36H33.631L35.031 20.7H35.9045L23.9995 10.9397Z'
    ></path>
  </svg>
)

export const HomeActiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox='0 0 48 48'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24.9505 7.84001C24.3975 7.38666 23.6014 7.38666 23.0485 7.84003L6.94846 21.04C6.45839 21.4418 6.2737 22.1083 6.48706 22.705C6.70041 23.3017 7.26576 23.7 7.89949 23.7H10.2311L11.4232 36.7278C11.5409 38.0149 12.6203 39 13.9128 39H21.5C22.0523 39 22.5 38.5523 22.5 38V28.3153C22.5 27.763 22.9477 27.3153 23.5 27.3153H24.5C25.0523 27.3153 25.5 27.763 25.5 28.3153V38C25.5 38.5523 25.9477 39 26.5 39H34.0874C35.3798 39 36.4592 38.0149 36.577 36.7278L37.7691 23.7H40.1001C40.7338 23.7 41.2992 23.3017 41.5125 22.705C41.7259 22.1082 41.5412 21.4418 41.0511 21.04L24.9505 7.84001Z'
    ></path>
  </svg>
)

export const UserGroupIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox='0 0 48 48'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M18 12.5C15.5897 12.5 13.5849 14.5018 13.5849 17.0345C13.5849 19.5672 15.5897 21.569 18 21.569C20.4103 21.569 22.4151 19.5672 22.4151 17.0345C22.4151 14.5018 20.4103 12.5 18 12.5ZM10.5849 17.0345C10.5849 12.9017 13.8766 9.5 18 9.5C22.1234 9.5 25.4151 12.9017 25.4151 17.0345C25.4151 21.1673 22.1234 24.569 18 24.569C13.8766 24.569 10.5849 21.1673 10.5849 17.0345ZM18 29.8793C14.0801 29.8793 10.7403 32.5616 9.69697 36.2673C9.5473 36.7989 9.03833 37.1708 8.49337 37.0811L7.50662 36.9189C6.96166 36.8292 6.58837 36.3131 6.72325 35.7776C8.00732 30.6788 12.5509 26.8793 18 26.8793C23.449 26.8793 27.9927 30.6788 29.2767 35.7776C29.4116 36.3131 29.0383 36.8292 28.4934 36.9189L27.5066 37.0811C26.9617 37.1708 26.4527 36.7989 26.303 36.2673C25.2597 32.5616 21.9199 29.8793 18 29.8793Z'
    ></path>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M33 31.5371C32.2445 31.5371 31.5198 31.668 30.8447 31.9093C30.3246 32.0951 29.7189 31.9243 29.4549 31.4392L28.9769 30.5608C28.713 30.0757 28.8907 29.463 29.4009 29.2516C30.513 28.791 31.7285 28.5371 33 28.5371C37.4554 28.5371 41.1594 31.6303 42.2706 35.7812C42.4135 36.3147 42.0386 36.8308 41.4935 36.9196L40.5065 37.0804C39.9614 37.1692 39.4546 36.7956 39.2894 36.2686C38.4217 33.5 35.91 31.5371 33 31.5371Z'
    ></path>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M33 18.5C31.6193 18.5 30.5 19.6193 30.5 21C30.5 22.3807 31.6193 23.5 33 23.5C34.3807 23.5 35.5 22.3807 35.5 21C35.5 19.6193 34.3807 18.5 33 18.5ZM27.5 21C27.5 17.9624 29.9624 15.5 33 15.5C36.0376 15.5 38.5 17.9624 38.5 21C38.5 24.0376 36.0376 26.5 33 26.5C29.9624 26.5 27.5 24.0376 27.5 21Z'
    ></path>
  </svg>
)

export const UserGroupActiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox='0 0 48 48'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M25.5 17C25.5 21.1421 22.1421 24.5 18 24.5C13.8579 24.5 10.5 21.1421 10.5 17C10.5 12.8579 13.8579 9.5 18 9.5C22.1421 9.5 25.5 12.8579 25.5 17Z'></path>
    <path d='M7.10396 34.7906C8.78769 30.2189 12.8204 27 18.0009 27C23.1818 27 27.2107 30.2213 28.8958 34.7898C29.3075 35.906 28.6141 37 27.5 37H8.5C7.38629 37 6.69289 35.9067 7.10396 34.7906Z'></path>
    <path d='M40.6308 37H32C31.2264 34.1633 30.0098 31.5927 28.144 29.7682C29.5384 28.9406 31.1829 28.5 33 28.5C37.239 28.5 40.536 30.8992 41.9148 35.0108C42.2516 36.0154 41.5423 37 40.6308 37Z'></path>
    <path d='M33 26.5C36.0376 26.5 38.5 24.0376 38.5 21C38.5 17.9624 36.0376 15.5 33 15.5C29.9624 15.5 27.5 17.9624 27.5 21C27.5 24.0376 29.9624 26.5 33 26.5Z'></path>
  </svg>
)

export const ExploreIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    fill='rgba(22, 24, 35, 1)'
    width={width}
    height={height}
    viewBox='0 0 48 48'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24 37.4a13.4 13.4 0 1 0 0-26.8 13.4 13.4 0 0 0 0 26.8ZM40.5 24a16.5 16.5 0 1 1-33 0 16.5 16.5 0 0 1 33 0Z'
    ></path>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M27.13 27.18a2 2 0 0 0 .93-1.32l1.84-9.33a.6.6 0 0 0-.9-.63l-8.14 4.92a2 2 0 0 0-.92 1.32l-1.84 9.33c-.1.52.45.9.9.63l8.13-4.92Zm-5.04-.45 3.11-1.89.7-3.57-3.1 1.89-.7 3.57Z'
    ></path>
  </svg>
)

export const ExploreActiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    fill='rgba(254, 44, 85, 1)'
    width={width}
    height={height}
    viewBox='0 0 48 48'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24 40.5a16.5 16.5 0 1 0 0-33 16.5 16.5 0 0 0 0 33Zm4.43-14.54c-.12.6-.49 1.12-1.01 1.44l-8.88 5.37a.65.65 0 0 1-.98-.69l2.01-10.18c.12-.6.49-1.12 1.01-1.44l8.88-5.37a.65.65 0 0 1 .98.69l-2.01 10.18Z'
    ></path>
    <path d='m21.92 26.89 3.4-2.05.76-3.9-3.4 2.06-.76 3.89Z'></path>
  </svg>
)

export const LiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox='0 0 32 32'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.78511 10.3334C6.95518 10.3334 6.33301 10.9792 6.33301 11.7143V20.2858C6.33301 21.0209 6.95518 21.6667 7.78511 21.6667H18.5744C19.4043 21.6667 20.0265 21.0209 20.0265 20.2858V17.5602C20.0265 17.1826 20.2392 16.8372 20.5763 16.6672C20.9135 16.4973 21.3177 16.5317 21.6212 16.7563L25.6663 19.7488V12.2513L21.6212 15.2439C21.3177 15.4684 20.9135 15.5029 20.5763 15.3329C20.2392 15.1629 20.0265 14.8175 20.0265 14.4399V11.7143C20.0265 10.9792 19.4043 10.3334 18.5744 10.3334H7.78511ZM25.6855 12.2371C25.6831 12.2388 25.6839 12.2383 25.6839 12.2383L25.6855 12.2371ZM25.6716 12.2177C25.673 12.2212 25.6746 12.2243 25.6763 12.2269C25.6798 12.2324 25.6834 12.2355 25.6855 12.2371L25.6874 12.2383C25.6874 12.2383 25.6865 12.238 25.6839 12.2383M4.33301 11.7143C4.33301 9.81952 5.90653 8.33337 7.78511 8.33337H18.5744C20.453 8.33337 22.0265 9.81953 22.0265 11.7143V12.4562L24.4963 10.629C25.0929 10.1877 25.8879 10.1155 26.5542 10.4359C27.224 10.758 27.6663 11.4325 27.6663 12.1905V19.8096C27.6663 20.5676 27.224 21.2421 26.5542 21.5642C25.888 21.8846 25.0929 21.8124 24.4963 21.371L22.0265 19.5439V20.2858C22.0265 22.1806 20.453 23.6667 18.5744 23.6667H7.78511C5.90653 23.6667 4.33301 22.1806 4.33301 20.2858V11.7143Z'
    ></path>
    <path d='M15 15.134C15.6667 15.5189 15.6667 16.4811 15 16.866L12 18.5981C11.3333 18.983 10.5 18.5019 10.5 17.7321L10.5 14.2679C10.5 13.4981 11.3333 13.017 12 13.4019L15 15.134Z'></path>
  </svg>
)

export const LiveActiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox='0 0 48 48'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M6.5 17.5714C6.5 14.7292 8.86029 12.5 11.6782 12.5H27.8621C30.6799 12.5 33.0402 14.7292 33.0402 17.5714V18.6843L36.745 15.9435C37.6399 15.2815 38.8324 15.1731 39.8318 15.6537C40.8365 16.1369 41.5 17.1486 41.5 18.2857V29.7143C41.5 30.8514 40.8365 31.8631 39.8318 32.3463C38.8324 32.8269 37.6399 32.7185 36.745 32.0565L33.0402 29.3158V30.4286C33.0402 33.2708 30.6799 35.5 27.8621 35.5H11.6782C8.86029 35.5 6.5 33.2708 6.5 30.4286V17.5714Z'></path>
    <path
      d='M23.25 23.134C23.9167 23.5189 23.9167 24.4811 23.25 24.866L17.25 28.3301C16.5833 28.715 15.75 28.2339 15.75 27.4641L15.75 20.5359C15.75 19.7661 16.5833 19.285 17.25 19.6699L23.25 23.134Z'
      fill='white'
    ></path>
  </svg>
)

export const LinkIcon = () => (
  <svg width='18' data-e2e='' height='18' viewBox='0 0 48 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M23.5857 9.58571C27.6805 5.49096 34.3194 5.49096 38.4141 9.58571C42.5089 13.6805 42.5089 20.3194 38.4141 24.4141L37.1212 25.707C36.7307 26.0975 36.0975 26.0975 35.707 25.707L34.2928 24.2928C33.9023 23.9023 33.9023 23.2691 34.2928 22.8786L35.5857 21.5857C38.1184 19.0531 38.1184 14.9468 35.5857 12.4141C33.053 9.88149 28.9468 9.88148 26.4141 12.4141L22.4141 16.4141C20.121 18.7072 19.9041 22.2903 21.7634 24.8275C22.0899 25.2729 22.0976 25.9023 21.707 26.2928L20.2928 27.707C19.9023 28.0975 19.2646 28.1001 18.9126 27.6745C15.5048 23.5554 15.7292 17.4422 19.5857 13.5857L23.5857 9.58571ZM27.707 20.2928C28.0976 19.9023 28.7352 19.8997 29.0873 20.3253C32.495 24.4444 32.2706 30.5576 28.4141 34.4141L24.4141 38.4141C20.3194 42.5089 13.6805 42.5089 9.58571 38.4141C5.49096 34.3193 5.49096 27.6804 9.58573 23.5857L10.8786 22.2928C11.2691 21.9023 11.9023 21.9023 12.2928 22.2928L13.707 23.707C14.0976 24.0975 14.0975 24.7307 13.707 25.1212L12.4141 26.4141C9.88148 28.9468 9.88148 33.053 12.4141 35.5857C14.9468 38.1183 19.053 38.1183 21.5857 35.5857L25.5857 31.5857C27.8788 29.2926 28.0957 25.7095 26.2364 23.1724C25.9099 22.7269 25.9023 22.0975 26.2928 21.707L27.707 20.2928Z'
    ></path>
  </svg>
)

export const PlayIcon = () => (
  <svg width='18' data-e2e='' height='18' viewBox='0 0 48 48' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z'
    ></path>
  </svg>
)

export const EditAvatar = () => (
  <svg width='16' data-e2e='' height='16' viewBox='0 0 48 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M26.5858 5.08579C27.3479 4.32371 28.5767 4.30253 29.3646 5.03789L36.8646 12.0379C37.2612 12.408 37.4904 12.9232 37.4997 13.4655C37.5091 14.0078 37.2977 14.5307 36.9142 14.9142L16.9142 34.9142C16.5391 35.2893 16.0304 35.5 15.5 35.5H8.5C7.39543 35.5 6.5 34.6046 6.5 33.5V26C6.5 25.4696 6.71071 24.9609 7.08579 24.5858L26.5858 5.08579ZM28.0479 9.2805L10.5 26.8284V31.5H14.6716L32.622 13.5496L28.0479 9.2805Z'
    ></path>
    <path d='M7 41C7 40.4477 7.44772 40 8 40H41C41.5523 40 42 40.4477 42 41V43C42 43.5523 41.5523 44 41 44H8C7.44772 44 7 43.5523 7 43V41Z'></path>
  </svg>
)

export const PauseBtn = () => (
  <svg width='20' data-e2e='' height='20' viewBox='0 0 48 48' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8 6C8 5.44771 8.44772 5 9 5H17C17.5523 5 18 5.44772 18 6V42C18 42.5523 17.5523 43 17 43H9C8.44772 43 8 42.5523 8 42V6Z'></path>
    <path d='M30 6C30 5.44771 30.4477 5 31 5H39C39.5523 5 40 5.44772 40 6V42C40 42.5523 39.5523 43 39 43H31C30.4477 43 30 42.5523 30 42V6Z'></path>
  </svg>
)

export const PlayBtn = () => (
  <svg width='20' data-e2e='' height='20' viewBox='0 0 48 48' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z'
    ></path>
  </svg>
)

export const Unmuted = () => (
  <svg width='24' data-e2e='' height='24' viewBox='0 0 48 48' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M25 10.8685C25 8.47242 22.3296 7.04325 20.3359 8.37236L10.3944 15H6C4.34315 15 3 16.3431 3 18V30C3 31.6568 4.34314 33 6 33H10.3944L20.3359 39.6276C22.3296 40.9567 25 39.5276 25 37.1315V10.8685ZM29.2929 18.1213L35.1716 24L29.2929 29.8787C28.9024 30.2692 28.9024 30.9024 29.2929 31.2929L30.7071 32.7071C31.0976 33.0976 31.7308 33.0976 32.1213 32.7071L38 26.8284L43.8787 32.7071C44.2692 33.0976 44.9024 33.0976 45.2929 32.7071L46.7071 31.2929C47.0976 30.9024 47.0976 30.2692 46.7071 29.8787L40.8284 24L46.7071 18.1213C47.0976 17.7308 47.0976 17.0976 46.7071 16.7071L45.2929 15.2929C44.9024 14.9024 44.2692 14.9024 43.8787 15.2929L38 21.1716L32.1213 15.2929C31.7308 14.9024 31.0976 14.9024 30.7071 15.2929L29.2929 16.7071C28.9024 17.0976 28.9024 17.7308 29.2929 18.1213Z'
    ></path>
  </svg>
)

export const Muted = () => (
  <svg width='24' data-e2e='' height='24' viewBox='0 0 48 48' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M20.3359 8.37236C22.3296 7.04325 25 8.47242 25 10.8685V37.1315C25 39.5276 22.3296 40.9567 20.3359 39.6276L10.3944 33H6C4.34314 33 3 31.6568 3 30V18C3 16.3431 4.34315 15 6 15H10.3944L20.3359 8.37236ZM21 12.737L12.1094 18.6641C11.7809 18.8831 11.3948 19 11 19H7V29H11C11.3948 29 11.7809 29.1169 12.1094 29.3359L21 35.263V12.737ZM32.9998 24C32.9998 21.5583 32.0293 19.3445 30.4479 17.7211C30.0625 17.3255 29.9964 16.6989 30.3472 16.2724L31.6177 14.7277C31.9685 14.3011 32.6017 14.2371 33.0001 14.6195C35.4628 16.9832 36.9998 20.3128 36.9998 24C36.9998 27.6872 35.4628 31.0168 33.0001 33.3805C32.6017 33.7629 31.9685 33.6989 31.6177 33.2724L30.3472 31.7277C29.9964 31.3011 30.0625 30.6745 30.4479 30.2789C32.0293 28.6556 32.9998 26.4418 32.9998 24ZM37.0144 11.05C36.6563 11.4705 36.7094 12.0995 37.1069 12.4829C40.1263 15.3951 42.0002 19.4778 42.0002 23.9999C42.0002 28.522 40.1263 32.6047 37.1069 35.5169C36.7094 35.9003 36.6563 36.5293 37.0144 36.9498L38.3109 38.4727C38.6689 38.8932 39.302 38.9456 39.7041 38.5671C43.5774 34.9219 46.0002 29.7429 46.0002 23.9999C46.0002 18.2569 43.5774 13.078 39.7041 9.43271C39.302 9.05421 38.6689 9.10664 38.3109 9.52716L37.0144 11.05Z'
    ></path>
  </svg>
)

export const CloseIcon = () => (
  <svg width='18' data-e2e='' height='18' viewBox='0 0 9 10' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
    <path d='M1.35299 0.792837L4.49961 3.93944L7.64545 0.792566C7.8407 0.597249 8.15733 0.597223 8.35262 0.792508L8.70669 1.14658C8.90195 1.34184 8.90195 1.65842 8.70669 1.85368L5.56027 5.0001L8.70672 8.14655C8.90198 8.34181 8.90198 8.65839 8.70672 8.85366L8.35316 9.20721C8.1579 9.40247 7.84132 9.40247 7.64606 9.20721L4.49961 6.06076L1.35319 9.20719C1.15793 9.40245 0.841345 9.40245 0.646083 9.20719L0.292629 8.85373C0.0973708 8.65847 0.0973653 8.3419 0.292617 8.14664L3.43895 5.0001L0.292432 1.85357C0.0972034 1.65834 0.0971656 1.34182 0.292347 1.14655L0.645801 0.792924C0.841049 0.597582 1.1577 0.597543 1.35299 0.792837Z'></path>
  </svg>
)

export const PrevIcon = () => (
  <svg width='26' data-e2e='' height='26' viewBox='0 0 48 48' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z'
    ></path>
  </svg>
)

export const NextIcon = () => (
  <svg width='26' data-e2e='' height='26' viewBox='0 0 48 48' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z'
    ></path>
  </svg>
)

export const UploadIcon = () => (
  <svg fill='currentColor' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' width='1em' height='1em'>
    <path d='M25.84 37h8.66a9.5 9.5 0 0 0 1.35-18.9A12 12 0 0 0 12 20v.01A8.5 8.5 0 0 0 12.5 37h10.34V25.6l-1.72 1.74a1 1 0 0 1-1.42 0l-.7-.7a1 1 0 0 1 0-1.41l4.4-4.4c.68-.76 1.22-.77 2 .08l4.28 4.32a1 1 0 0 1 0 1.4l-.7.72a1 1 0 0 1-1.42 0l-1.72-1.75V37Z'></path>
  </svg>
)
