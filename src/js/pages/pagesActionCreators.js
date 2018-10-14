// @flow

export const clearPageConfig = (pageName:string) => ({
  type: `${pageName.toUpperCase()}_PAGE_CLEAR`
});