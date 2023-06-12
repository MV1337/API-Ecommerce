import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    email,
    name,
    password,
    id,
    confirmationEmailToken,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      email,
      name,
      password,
      id,
      confirmationEmailToken,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async listAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async findByConfirmationEmailToken(token: string): Promise<User> {
    const user = this.repository.findOne({ confirmationEmailToken: token });

    return user;
  }

  async updateIsEmailConfirmed(confirmationEmailToken: string, isEmailConfirmed: boolean) {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ isEmailConfirmed })
      .where("confirmationEmailToken = :confirmationEmailToken")
      .setParameters({ confirmationEmailToken })
      .execute();

      await this.repository.createQueryBuilder()
      .update(User)
      .set({ confirmationEmailToken: "null" })
      .where("confirmationEmailToken = :confirmationEmailToken", { confirmationEmailToken })
      .execute()
  }
}

export { UsersRepository };
