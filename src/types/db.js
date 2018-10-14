// @flow

export type User = {
  username:string,
  password:string
};

export type Highscore = {
  username:string
};

type Token = {
  token:string
};

export type Game = {
  id:string,
  categoryId:string,
  name:string,
  description:string
};

export type Credentials = User | Token;