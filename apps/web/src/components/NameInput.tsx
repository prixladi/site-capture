import React, { Ref } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { requiredMessage } from '../utils/validationUtils';
import InputBase from './InputBase';

type Props = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  errorMessage?: string;
};

const lengthMessage = 'Field must be string between 1 and 50 characters long';

const NameInput: React.FC<Props> = ({ register, errorMessage }: Props) => (
  <InputBase
    errorMessage={errorMessage}
    register={register({
      required: { value: true, message: requiredMessage },
      minLength: { value: 1, message: lengthMessage },
      maxLength: { value: 50, message: lengthMessage },
    })}
    isRequired
    placeholder="Name"
    label="Name"
    name="name"
    type="text"
  />
);

export default NameInput;
