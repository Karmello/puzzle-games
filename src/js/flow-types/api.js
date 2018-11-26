// @flow
export type T_ApiRequest = {
  isAwaiting?:boolean,
  headers?:{},
  params?:{},
  query?:{},
  body?:{}
};

export type T_ApiResponse = {
  config:{
    method:string,
    url:string
  },
  status:number,
  statusText:string,
  data:any
};

export type T_ApiError = {
  config:{
    method:string,
    url:string
  },
  response:{
    status:number,
    statusText:string,
    data:any
  }
};

export type T_ApiEndPoint = {
  req:T_ApiRequest,
  res:T_ApiResponse
};

export type T_ApiEntities = {
  clientUser:T_ApiEndPoint,
  games:T_ApiEndPoint,
  gameCategories:T_ApiEndPoint,
  highscores:T_ApiEndPoint,
  bestHighscore:T_ApiEndPoint,
  newHighscore:T_ApiEndPoint
};