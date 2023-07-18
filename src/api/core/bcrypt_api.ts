import bcrypt from "bcryptjs";

class BrcyptApi {
  async hash(password: string, salt: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hashedPassword);

    return result;
  }
}

export { BrcyptApi };
