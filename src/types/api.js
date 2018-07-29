// @flow

export type ApiRequest = {
  isAwaiting:boolean,
  method:string,
  url:string,
  headers?:{},
  params?:{},
  query?:{},
  body?:{}
};

export type ApiResponse = {
  status:number,
  statusText:string,
  config?:any,
  data:any
};

export type ApiError = {
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

export type ApiEndPoint = {
  req:ApiRequest,
  res:ApiResponse
};