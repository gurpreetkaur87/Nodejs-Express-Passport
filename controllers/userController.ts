import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }else{
      throw new Error(`Password is incorrect.`);
    }
  }
  return null;
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

/* 
  findOrCreate() function call findOrCreateUser() function of userModel.ts file, 
  which is used insert githhub user's data to the database 
  i.e insert user object to the database array on first time login.  */
function findOrCreate(profile: any){
  let user = userModel.findOrCreateUser(profile);
  if (user) {
    return user;
  }
  return null;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate,
};
