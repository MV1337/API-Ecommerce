import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { resolve } from "path";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "confirmEmail.hbs"
    );

    if (userAlreadyExists) {
      throw new AppError("Este e-mail já está cadastrado em nosso sistema!");
    }

    if (!name || !email || !password) {
      throw new AppError("Todos os campos são obrigatórios...");
    }

    const PasswordHash = await hash(password, 10);
    const confirmationEmailToken = Math.random().toString(36).substring(2);
    const url = process.env.CONFIRM_MAIL_URL

    const variables = {
      name,
      link: `${url}${confirmationEmailToken}`,
    };

    try {
      await this.usersRepository.create({
        name,
        email,
        password: PasswordHash,
        confirmationEmailToken,
      });

      await this.mailProvider.sendMail(
        email,
        "Confirmação de email",
        variables,
        templatePath
      );
    } catch (error) {
      throw new AppError(
        "Ocorreu um erro ao criar seu usuário, tente novamente mais tarde",
        500
      );
    }
  }
}

export { CreateUserUseCase };
