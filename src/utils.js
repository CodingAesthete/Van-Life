export function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    window.location.href = '../../login';
  }
}
