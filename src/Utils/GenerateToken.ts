import jwt from "jsonwebtoken";
interface payloadInterface {
  id: string;
  role: string;
  name: string;
}

export default function GenerateToken(payload: payloadInterface) {
  // Set the options for token expiration (7 days)
  const options = { expiresIn: "7d" };

  // Sign the payload and generate the token
  const { JWT_SECRET } = process.env;
  const token = jwt.sign(payload, String(JWT_SECRET), options);

  return token;
}
