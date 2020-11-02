export type Pro = {
  [key: string]: any;
  _id: string;
  name: string;
  premiumLevel: string;
  phone: string;
  email: string;
  idUser: string;
};

export type Parent = {
  [key: string]: any;
  _id: string;
  firstname: string;
  lastname: string;
  numberOfChildren: number;
  idUser: string;
};
