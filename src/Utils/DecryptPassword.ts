import { compareSync } from "bcrypt";

export default function comparePasswords(
  originalPassword: string,
  encryptedPassword: string
) {
  try {
    // Compare the original password with the encrypted password
    const isMatch = compareSync(originalPassword, encryptedPassword);

    return isMatch;
  } catch (error) {
    throw new Error("Password comparison failed");
  }
}
