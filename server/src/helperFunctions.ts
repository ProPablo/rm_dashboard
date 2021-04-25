import { Request, Response, NextFunction } from "express";
import { BaseEntity, SelectQueryBuilder } from "typeorm";
import { HTTPException } from "./Errors";

export type IDLookup = Map<number, number>;

//this will be called by default without try catch or if next(error);
export function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
  const resStatus = (response.statusCode != 200) ? response.statusCode : null;
  let status = error.status || resStatus || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .json({
      status,
      message,
    })
}

export function createListQuery<EntityType extends BaseEntity>(query: SelectQueryBuilder<EntityType>, req: Request, acceptableParams: Array<String>): SelectQueryBuilder<EntityType> {
  if (req.query._sort && typeof req.query._sort == 'string') query.orderBy(req.query._sort, req.query._order as any);

  let listOfParams = Object.keys(req.query).filter(x => !x.startsWith('_'));
  if (listOfParams && listOfParams.every(x => acceptableParams.includes(x))) {
    listOfParams.forEach(param => {
      const paramValue = req.query[param];
      if (Array.isArray(paramValue)) query.andWhere(`E.${param} IN (:...paramValue)`, { paramValue })
      else query.andWhere(`E.${param} = :paramValue`, { paramValue })
    });
  }
  else {
    throw new HTTPException(400, "Query parameters invalid");
  }
  return query;
}