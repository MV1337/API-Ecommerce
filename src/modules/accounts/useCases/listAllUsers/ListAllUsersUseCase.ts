import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAllUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute() {
        const users = await this.usersRepository.listAll()

        const returnReponse = users.map((user) => {
            const userObj = {
                name: user.name,
                email: user.email,
                admin: user.isAdmin
            }

            return userObj
        })

        return returnReponse
    }
}

export {ListAllUsersUseCase}