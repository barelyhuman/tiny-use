type ResponseTypes = void | null | Response | boolean
type MiddlewareFunc = (req: Request) => ResponseTypes | Promise<ResponseTypes>

export const use = (...list: MiddlewareFunc[]) => {
  return async (req: Request): Promise<Response | void> => {
    let lastRes: ResponseTypes
    for (let fn of list) {
      const response = await fn(req)
      if (response === null || response === false) {
        break
      }
      lastRes = response
      if (response instanceof Response) {
        break
      }
    }
    if (!lastRes) {
      return
    }
    return lastRes as Response
  }
}
