export type TUser = {
  id: number;
  fullname: string;
  email: string;
};

export type TNewUser = Omit<TUser, "id"> & {
  password: string;
};
