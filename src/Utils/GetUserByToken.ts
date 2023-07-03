import jwt from "jsonwebtoken";
import { Users } from "../Entities/Users";
async function GetUserByToken(token: any) {
  let user = null;
  try {
    if (token && token.includes("bearer")) {
      token = token.split(" ")[1];
      if (token) {
        const { JWT_SECRET } = process.env;
        const id = String(jwt.verify(token, String(JWT_SECRET)));
        user = await Users.findOneBy({ id: parseInt(id) });
        console.log(id);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return user;
}

export default GetUserByToken;
