const bcrypt = require("bcryptjs")
const salt = 10

async function tryBycrypt(){

const user = {password: "123"}
let hashedPwd = await bcrypt.hash(user.password, salt)
console.log(hashedPwd)

user.password= "123"
hashedPwd = await bcrypt.hash(user.password, salt)
console.log(hashedPwd)

user.password= "xyz"
hashedPwd = await bcrypt.hash(user.password, salt)
console.log(hashedPwd)

}


tryBycrypt()