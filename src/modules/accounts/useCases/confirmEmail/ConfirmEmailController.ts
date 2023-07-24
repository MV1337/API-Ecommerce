import { Request, Response } from "express";
import { container } from "tsyringe";
import { ConfirmEmailUseCase } from "./ConfirmEmailUseCase";

class ConfirmEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const confirmationEmailToken = request.params.confirmationEmailToken;

    const confirmEmailUseCase = container.resolve(ConfirmEmailUseCase);

    await confirmEmailUseCase.execute(confirmationEmailToken);

    return response.send(
      `<p style="text-align: center;">E-mail verificado com sucesso...</p><br/> <p style="text-align: center;">Volte para a tela de login 
      <a href=${process.env.URL_LOGIN_PAGE}>${process.env.URL_LOGIN_PAGE}</a> <p/>`
    );
  }
}

export { ConfirmEmailController };
