// @flow
export type T_UserModel = {
  username:string,
  password:string
};

export type T_GameModel = {
  id:string,
  categoryId:string,
  name:string,
  description:string
};

export type T_GameOptionsModel = {
  mode?:string,
  dimension?:string
};

export type T_HighscoreModel = {
  username:string,
  gameId:string,
  options:T_GameOptionsModel,
  details:{ moves:number, seconds:number }
};
