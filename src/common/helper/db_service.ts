import knex, { Knex } from "knex";

class DbService {
  static instance(): Knex {
    const i = knex({
      client: "mysql",
      pool: { min: 0, max: 20 },
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
