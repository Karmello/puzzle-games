// @flow

export type ApiRequest = {
  isAwaiting?:boolean,
  headers?:{},
  params?:{},
  query?:{},
  body?:{}
};

export type ApiResponse = {
  config:{
    method:string,
    url:string
  },
  status:number,
  statusText:string,
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