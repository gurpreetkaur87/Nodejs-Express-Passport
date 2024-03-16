const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jim",
    role:"user",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role:"user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role:"user",
  },
  {
    id: 4,
    name: "Gurpreet Kaur",
    email: "gur123@gmail.com",
    password: "gur",
    role:"admin",
  },
];

const userModel = {

  /* FIX ME (types) 😭 FIXED 😊*/
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },

  /* FIX ME (types) 😭 FIXED 😊*/
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  
  /* findOrCreateUser() function is used insert githhub user's data to the database 
  i.e insert user object to the database array on first time login.  */
  findOrCreateUser:(profile:any)=>{
    const user = database.find((user) => user.id === profile.id);
    if (user) {
      return user;
    }else{
      const gituser = {
        id: profile.id,
        name: profile.displayName,
        email: profile.username,
        password: '',
        role:'user',
      }
      const gituserCreated = database.push(gituser);
      if (gituserCreated) { 
        return gituser;
      }
      throw new Error(`Couldn't insert user with id: ${profile.id}`);
    }
  },

};

export { database, userModel };