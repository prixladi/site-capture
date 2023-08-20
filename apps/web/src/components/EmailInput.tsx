import React, { Ref } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { emailRegex } from '../constants';
import { requiredMessage } from '../utils/validationUtils';
import InputBase from './InputBase';

type Props = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  errorMessage?: string;
};

const EmailInput: React.FC<Props> = ({ register, errorMessage }: Props) => (
  <InputBase
    autoComplete="on"
    errorMessage={errorMessage}
    register={register({
      required: { value: true, message: requiredMessage },
      pattern: {
        value: emailRegex,
        message: 'Field value must be valid email',
      },
    })}
    isRequired
    placeholder="Email"
    label="Email"
    name="email"
    type="email"
  />
);

export default EmailInput;
