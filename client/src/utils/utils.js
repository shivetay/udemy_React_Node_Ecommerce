export const signOut = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    return fetch('http://localhost:8000/api/signout', { method: 'GET' }).then(res => {
      console.log('signout', res);
    });
  }
};

//check if user is auth and there is jwt item in localstorage. menu render
export const isAuthUser = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
