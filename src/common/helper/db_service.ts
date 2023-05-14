import knex, { Knex } from "knex";

class DbService {
  instance(): Knex {
    const i = knex({
      client: "mysql",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    });

    return i;
  }
}

export { DbService };
