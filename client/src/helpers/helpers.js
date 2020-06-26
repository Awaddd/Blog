import jwt from "jsonwebtoken";
import moment from "moment";

export function authHeader(postsOptions) {

  const user = localStorage.getItem('user');

  if (user && postsOptions) {

    return { 
      'Authorization': 'Bearer ' + user,
      'Content-Type':'multipart/form-data'
    };
    

  } else if (user) {
    
    return { 
      'Authorization': 'Bearer ' + user,
      'Content-Type': 'application/json' 
    };
    
  }
  else {
    return { 'Content-Type': 'application/json' };
  }
}

export function getToken(){
  const user = localStorage.getItem('user');
  return jwt.decode(user);
}

export function sanitizeTitle(title){
  return title.replace(/\s+/g, "-").toLowerCase();
}

export function formatDate(date, format){
  if (format) return moment(date).format(format) 
  else return moment(date).format('MMMM Do YYYY');
}

export function formatCommentDate(datetime) {
  return moment(datetime).fromNow();
}