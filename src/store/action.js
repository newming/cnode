function login(user, accesstoken) {
  return {type: 'LOGIN', user, accesstoken}
}

function logout() {
  return {type: 'LOGOUT', user: null, accesstoken: null}
}

export {login, logout}
