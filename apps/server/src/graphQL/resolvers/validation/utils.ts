import { UserInputError } from 'apollo-server-express';
import joi from 'joi';
import { objIdRegex, pathRegex } from '../../../constants';
import { PaginationInput, Viewport } from '../../types';

type Errors = Record<string, string[]>;

const paginationSchema = joi.object<PaginationInput>({
  skip: joi.number().min(0).required(),
  limit: joi.number().min(1).max(200).required(),
});

const idSchema = joi.string().pattern(objIdRegex).required();

const viewportsSchema = joi
  .array()
  .min(1)
  .max(6)
  .items(
    joi.object<Viewport>({
      width: joi.number().min(300).max(10000),
      height: joi.number().min(300).max(10000),
    }),
  );

const subsitesSchema = joi.array().max(10).items(joi.string().regex(pathRegex));

const quealitySchema = joi.number().min(1).max(100).required();

const validate = <T extends unknown>(schema: joi.AnySchema, object: T, extendErrors?: Errors | null): Errors | null => {
  const result = schema.validate(object, { abortEarly: false });
  if (result.error) {
    return result.error.details
      .map((item) => ({ message: item.message, path: item.path.join('.') }))
      .reduce((prev, dto) => {
        if (!prev[dto.path]) {
          prev[dto.path] = [dto.message];
        } else {
          prev[dto.path].push(dto.message);
        }

        return prev;
      }, extendErrors ?? ({} as Errors));
  }

  return null;
};

const inputError = (errors: Errors): UserInputError => new UserInputError('Input validation error', errors);

export { paginationSchema, idSchema, viewportsSchema, quealitySchema, validate, inputError, subsitesSchema };
