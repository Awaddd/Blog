import jwt from "jsonwebtoken";

export function authHeader(postsOptions) {

  const user = localStorage.getItem('user');

  if (user && postsOptions) {

    console.log('sending posts token');
    console.log(user);

    return { 
      'Authorization': 'Bearer ' + user,
      'Content-Type':'multipart/form-data'
    };
    

  } else if (user) {

    console.log('sending token');
    
    return { 
      'Authorization': 'Bearer ' + user,
      'Content-Type': 'application/json' 
    };
    
  }
  else {
      console.log('no token');
      return { 'Content-Type': 'application/json' };
  }
}

export function getToken(){
  const user = localStorage.getItem('user');
  return jwt.decode(user);
}