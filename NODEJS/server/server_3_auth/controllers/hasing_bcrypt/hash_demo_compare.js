const bcrypt = require("bcryptjs")
const salt = 10

async function tryBycrypt(){

const h1 = "$2b$10$uTBdu4KYG4VLTQzFnfc69.n15yMo0aFIdL9pm43aO/.K.1cvKzXGG"
const h2 = "$2b$10$rxHq.LgGWZjGiFgvz.s.au/DvuPJ9YZAL/fnJc5N2vnvC0dnpqe2G"
const h3 = "$2b$10$S5bYXhacqYixcaaefdzx2ukIj3x7Ky/EJ29MlHpLRxoumdmBbtONu"

console.log(await bcrypt.compare('xyz',h1)) // false
console.log(await bcrypt.compare('321',h1)) // false
console.log(await bcrypt.compare('1234',h1)) // false
console.log(await bcrypt.compare('123',h1)) // true

console.log(await bcrypt.compare('xyz',h3)) // true
console.log(await bcrypt.compare('321',h3)) // false

}


tryBycrypt()