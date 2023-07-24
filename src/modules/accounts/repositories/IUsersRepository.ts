import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  listAll(): Promise<User[]>
  findByConfirmationEmailToken(token: string): Promise<User>
  updateIsEmailConfirmed(confirmationEmailToken: string, isEmailConfirmed: boolean): Promise<void>
}

export { IUsersRepository };
