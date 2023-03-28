"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "O nome precisa de 3 caracteres." }),
    age: zod_1.z.number().min(18, { message: "Você precisa ser maior de idade." })
});
function saveUserToDatabase(user) {
    const { name, age } = userSchema.parse(user);
    console.log(name, age);
}
saveUserToDatabase({
    name: "joao",
    age: 20
});
