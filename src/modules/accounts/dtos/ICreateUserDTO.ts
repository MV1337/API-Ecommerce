interface ICreateUserDTO {
  name?: string
  email?: string;
  password?: string;
  id?: string;
  confirmationEmailToken?: string
}

export { ICreateUserDTO };
