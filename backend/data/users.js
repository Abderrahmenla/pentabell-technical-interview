import bcrypt from 'bcryptjs'

const users = [
 { 
  firstName: "Abderrahmen",
  lastName: "lahmedi",
  email: "contact@abderrahmenlh.com",
  password: bcrypt.hashSync('123456', 10),
  phoneNumber: "+216 20933337",
 },

 { 
  firstName: "Pentabell",
  lastName: "RH",
  email: "contact@pentabell.com",
  password: bcrypt.hashSync('pentabell12563', 10),
  phoneNumber: "+216 20933337",
 },

 { 
  firstName: "Pentabell",
  lastName: "group",
  email: "group@pentabell.com",
  password: bcrypt.hashSync('pentabell123456', 10),
  phoneNumber: "+216 20933337",
 },
]

export default users
