import React, { Ref } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { requiredMessage } from '../utils/validationUtils';
import InputBase from './InputBase';

type Props = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  errorMessage?: string;
};

const UrlInput: React.FC<Props> = ({ register, errorMessage }: Props) => (
  <InputBase
    errorMessage={errorMessage}
    register={register({
      required: { value: true, message: requiredMessage },
      pattern: {
        value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        message: 'Field must be valid url',
      },
    })}
    isRequired
    placeholder="Url"
    label="Site Url"
    name="url"
    type="url"
  />
);

export default UrlInput;
