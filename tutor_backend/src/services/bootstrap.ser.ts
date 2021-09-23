import { db } from "../services";

export default async function () {
  try {
    await connectMySQLServer();
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function connectMySQLServer() {
  await db.mysql.authenticate();
  console.log("Success: Database connected");
}