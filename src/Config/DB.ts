import { DataSource } from "typeorm";
import { Users } from "../Entities/Users";
import "dotenv/config";
console.log(process.env.DB_USERNAME);
const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: [Users],
});
export default AppDataSource;
