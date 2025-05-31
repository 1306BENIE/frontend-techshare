export type RegisterFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  cgu: boolean;
};

export type LoginFormValues = {
  email: string;
  password: string;
};
