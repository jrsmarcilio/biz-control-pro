import { Service } from "@tsed/common";
import { UsersRepository } from "@tsed/prisma";

@Service()
export class UsersService extends UsersRepository {

  async findById(id: string) {
    return this.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.findUnique({ where: { email } });
  }

  async verifyPassword(password: string, email: string) {
    const user = await this.findByEmail(email)
    return user?.password === password
  }

  async exists(email: string) {
    return !!(await this.findUnique({ where: { email } }));
  }
}
