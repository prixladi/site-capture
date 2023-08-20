import React, { Ref } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { requiredMessage } from '../utils/validationUtils';
import InputBase from './InputBase';

type Props = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  errorMessage?: string;
  validateLen?: boolean;
  newPassword?: boolean;
};

const PasswordInput: React.FC<Props> = ({ register, errorMessage, validateLen, newPassword }: Props) => (
  <InputBase
    autoComplete={newPassword ? 'new-password' : 'current-password'}
    errorMessage={errorMessage}
    register={register({
      required: { value: true, message: requiredMessage },
      minLength: validateLen ? { value: 6, message: 'Field must be at least 6 chacters long' } : undefined,
    })}
    isRequired
    placeholder="*********"
    label="Password"
    name="password"
    type="password"
  />
);

export default PasswordInput;
