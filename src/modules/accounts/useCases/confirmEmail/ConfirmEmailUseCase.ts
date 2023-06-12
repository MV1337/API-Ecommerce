import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ConfirmEmailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute(token: string) {
        const user = await this.usersRepository.findByConfirmationEmailToken(token)

        if(!user) {
            throw new AppError("Token inválido ou expirado.")
        }

        try {
            await this.usersRepository.updateIsEmailConfirmed(token, true)

            user.confirmationEmailToken = null
        } catch (error) {
            throw new AppError("Ocorreu um erro ao validar seu e-mail", 500)
        }
     }
}

export {ConfirmEmailUseCase}