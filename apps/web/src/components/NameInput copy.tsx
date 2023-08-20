import React, { Ref } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { requiredMessage } from '../utils/validationUtils';
import InputBase from './InputBase';

type Props = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  errorMessage?: string;
};

const NameInput: React.FC<Props> = ({ register, errorMessage }: Props) => (
  <InputBase
    errorMessage={errorMessage}
    register={register({
      required: { value: true, message: requiredMessage },
      pattern: {
        value: /^[/a-zA-Z0-9-#?&=_.]+$/,
        message: 'Field must be string cointaining only letters, numbers, #, ?, &, =, _ and .',
      },
    })}
    isRequired
    placeholder="Name"
    label="Name"
    name="name"
    type="text"
  />
);

export default NameInput;
