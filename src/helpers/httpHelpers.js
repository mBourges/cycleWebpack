export function wrapApiAuth(request) {
  return {
      lazy: true,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('id_token')}`
      },
      ...request
    };
}