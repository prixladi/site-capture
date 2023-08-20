import React, { Ref } from 'react';
import { FormControl, FormLabel, Flex, Grid } from '@chakra-ui/react';
import { Control, FieldErrors, RegisterOptions, useFieldArray } from 'react-hook-form';
import InputBase from './InputBase';
import { requiredMessage } from '../utils/validationUtils';
import PlusButton from './PlusButton';
import MinusButton from './MinusButton';
import useCompactLayout from '../hooks/useCompactLayout';
import { pathRegex } from '../constants';

type Subsite = {
  value: string;
};

type InputProps = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  subsite?: Partial<Subsite>;
  remove: (index: number) => void;
  index: number;
  error?: FieldErrors<Subsite>;
};

type Props = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  control: Control;
  errors?: (FieldErrors<Subsite> | undefined)[];
};

const errorMessage = 'Field must be string cotaining only letter, numbers, #, ?, &, =, _ and .';

const dimensionRules: RegisterOptions = {
  required: { value: true, message: requiredMessage },
  pattern: { value: pathRegex, message: errorMessage },
};

const SubsiteInput: React.FC<InputProps> = ({ register, remove, index, subsite, error }: InputProps) => {
  const name = `subsites[${index}].value`;

  return (
    <Flex gridGap="1em" width="100%">
      <InputBase
        defaultValue={subsite?.value}
        isRequired
        placeholder="Path"
        errorMessage={error?.value?.message}
        type="string"
        name={name}
        register={register(dimensionRules)}
      />
      <MinusButton onClick={() => remove(index)} />
    </Flex>
  );
};

const SubsitesInput: React.FC<Props> = ({ register, control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray<Subsite>({
    control,
    name: 'subsites',
  });
  const isCompact = useCompactLayout();

  return (
    <FormControl isRequired>
      <FormLabel>Subsites of provided Url</FormLabel>
      <Grid gridGap="1em" templateColumns={isCompact ? '1fr 1fr' : '1fr 1fr 1fr'}>
        {fields.map((subsite: Partial<Subsite & { id: string | number | null | undefined }>, index: number) => (
          <SubsiteInput error={errors?.[index]} key={subsite.id} remove={remove} register={register} subsite={subsite} index={index} />
        ))}

        {fields.length < 10 && (
          <Flex justifyContent="begin">
            <PlusButton onClick={() => append({})} />
          </Flex>
        )}
      </Grid>
    </FormControl>
  );
};

export type { Subsite };
export default SubsitesInput;
