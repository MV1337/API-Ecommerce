import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
  isAdmin: boolean;
  email: string;
  name: string;
}

@injectable()
class ListUserInfoUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
  async execute(id: string) {
        const user = await this.usersRepository.findById(id)

        const userReturn: IResponse = {
            isAdmin: user.isAdmin,
            email: user.email,
            name: user.name
        }

        return userReturn
  }
}

export { ListUserInfoUseCase };
