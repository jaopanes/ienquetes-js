export function auth({ next }) {
  if (!localStorage.getItem('userLogged')) {
    next({ name: 'Login' });
  } else next();
}