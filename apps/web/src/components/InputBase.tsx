import React, { Ref } from 'react';
import { Input, FormControl, FormLabel, FormErrorMessage, InputProps } from '@chakra-ui/react';

type Props = InputProps & {
  register: Ref<HTMLInputElement>;
  isRequired: boolean;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  defaultValue?: string | number | readonly string[];
};

const InputBase: React.FC<Props> = ({
  register,
  isRequired,
  label,
  name,
  type,
  placeholder,
  errorMessage,
  defaultValue,
  ...props
}: Props) => (
  <FormControl isInvalid={!!errorMessage} isRequired={isRequired}>
    {label && <FormLabel>{label}</FormLabel>}
    <Input defaultValue={defaultValue} placeholder={placeholder} type={type} name={name} ref={register} {...props} />
    {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
  </FormControl>
);

export default InputBase;
