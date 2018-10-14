// @flow

import type { GameOptions } from 'types/store';

export type User = {
  username:string,
  password:string
};

export type Highscore = {
  username:string,
  gameId:string,
  options:GameOptions,
  details:{ moves:number, seconds:number }
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