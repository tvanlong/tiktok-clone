import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulb,
  faEarthAmericas,
  faCircleQuestion,
  faKeyboard,
  faMoon,
  faUser,
  faBookmark,
  faCoins,
  faGear,
  faSignOut
} from '@fortawesome/free-solid-svg-icons'

export const menuItems = [
  {
    icon: <FontAwesomeIcon icon={faLightbulb} />,
    title: 'LIVE Creator Hub'
  },
  {
    icon: <FontAwesomeIcon icon={faEarthAmericas} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          title: 'English'
        },
        {
          title: 'Vietnamese'
        }
      ]
    }
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help'
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts'
  },
  {
    icon: <FontAwesomeIcon icon={faMoon} />,
    title: 'Dark mode'
  }
]

export const userMenu = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'View profile'
  },
  {
    icon: <FontAwesomeIcon icon={faBookmark} />,
    title: 'Favorties'
  },
  {
    icon: <FontAwesomeIcon icon={faCoins} />,
    title: 'Get coins'
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: 'Settings'
  },
  ...menuItems,
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: 'Log out',
    separate: true,
    logout: true
  }
]
