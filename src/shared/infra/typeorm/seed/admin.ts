import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import { createConnection } from "typeorm";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", "isEmailConfirmed",created_at ) 
      values('${id}', 'lmAdmin', 'admin@email.com', '${password}', true, true,'now()')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));