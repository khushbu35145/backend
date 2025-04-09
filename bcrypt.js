import bcrypt from "bcrypt";

const plainPassword = "mypass";
const hashedPassword = await bcrypt.hash(plainPassword, 10);

console.log("Hashed Password:", hashedPassword);

const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
console.log("Do they match?", isMatch);  // Should print: true
