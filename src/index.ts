import type { IncomingMessage, ServerResponse } from "node:http";

type MiddlewareFunc = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
  next: () => Promise<void>
) => Promise<void>;

export const use = <IncomingMessageT extends IncomingMessage>(
  ...list: MiddlewareFunc[]
) => {
  const next =
    (
      i: number,
      req: IncomingMessageT,
      res: ServerResponse<IncomingMessageT> & { req: IncomingMessageT }
    ) =>
    async () => {
      if (i + 1 > list.length) {
        return;
      }
      await list[i](req, res, next(i + 1, req, res));
    };
  return async (
    req: IncomingMessageT,
    res: ServerResponse<IncomingMessageT> & { req: IncomingMessageT }
  ) => {
    await next(0, req, res)();
  };
};
