import { routes as listRoutes } from './List';

// routes
const routes = {
  '/': 'Catena',

  // add list routes
  ...Object.fromEntries(
    Object.entries(listRoutes).map(([route, { title }]) => (
      [`/${route}`, title]
    ))
  )
}

// sidebar view
const Sidebar = {
  view: () => (
    Object.entries(routes).map(([route, title]) => (
      m(m.route.Link, {
        href: route,
        style:
          route === m.route.get() ||
          (route === '/' && !(m.route.get() in routes))
            ? { background: '#eee' }
            : {}
      }, title)
    ))
  )
};

export default Sidebar;
