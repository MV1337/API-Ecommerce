import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  findByConfirmationEmailToken(token: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateIsEmailConfirmed(confirmationEmailToken: string, isEmailConfirmed: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
  users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  listAll(): Promise<User[]> {
    return
  }

}

export { UsersRepositoryInMemory };
