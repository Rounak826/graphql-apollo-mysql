import { hashSync, genSaltSync } from "bcrypt";

export default async function encryptPassword(password: string) {
  try {
    // Generate a salt to be used in the hashing process
    const salt = genSaltSync(10);

    // Hash the password using the generated salt
    const encryptedPassword = hashSync(password, salt);

    return encryptedPassword;
  } catch (error) {
    throw new Error("Password encryption failed");
  }
}
