import { SLUGS, ROUTES } from './constants'

const NAV_ITEMS = [
  { slug: SLUGS.HOME, label: 'Home', path: ROUTES[SLUGS.HOME] },
  { slug: SLUGS.DASHBOARD, label: 'Dashboard', path: ROUTES[SLUGS.DASHBOARD] },
  { slug: SLUGS.PROFILE, label: 'Profile', path: ROUTES[SLUGS.PROFILE] },
  { slug: SLUGS.LOGIN, label: 'Login', path: ROUTES[SLUGS.LOGIN] },
]

export { SLUGS, ROUTES }
export default NAV_ITEMS
