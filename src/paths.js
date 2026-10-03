export function getRoutePathname(pathname = window.location.pathname) {
  const base = import.meta.env.BASE_URL;
  const route = base === '/' ? pathname : pathname.slice(base.length - 1);
  return route || '/';
}
