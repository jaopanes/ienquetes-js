export function guest({ next }) {
  if (localStorage.getItem("userLogged")) {
    next({ name: "Surveys" });
  } else next();
}