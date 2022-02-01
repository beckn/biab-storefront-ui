export default ({ app, route, redirect }) => {
  if (route.path === '/Login') {
    if (!app.$fire.auth.currentUser) {
      // leave them on the sign in page
    } else {
      return redirect('/');
    }
  }
};
