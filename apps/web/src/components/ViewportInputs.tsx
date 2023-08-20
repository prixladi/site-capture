import React, { Ref, useEffect } from 'react';
import { FormControl, FormLabel, Flex, Grid } from '@chakra-ui/react';
import { Control, FieldErrors, RegisterOptions, useFieldArray } from 'react-hook-form';
import InputBase from './InputBase';
import { requiredMessage } from '../utils/validationUtils';
import PlusButton from './PlusButton';
import MinusButton from './MinusButton';

type Viewport = {
  width: number;
  height: number;
};

type InputProps = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  viewport: Partial<Viewport>;
  remove: (index: number) => void;
  index: number;
  totalLen: number;
  error: FieldErrors<Viewport> | undefined;
};

type Props = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  control: Control;
  errors?: (FieldErrors<Viewport> | undefined)[];
};

const errorMessage = 'Field value must be number between 300 and 10000';

const dimensionRules: RegisterOptions = {
  min: { value: 300, message: errorMessage },
  max: { value: 10000, message: errorMessage },
  required: { value: true, message: requiredMessage },
  setValueAs: (val) => parseInt(val) || undefined,
};

const ViewportInput: React.FC<InputProps> = ({ register, remove, index, viewport, totalLen, error }: InputProps) => {
  const widthName = `viewports[${index}].width`;
  const heigthName = `viewports[${index}].height`;

  return (
    <Flex gridGap="1em" width="100%">
      <InputBase
        defaultValue={viewport?.width}
        isRequired
        placeholder="Width"
        errorMessage={error?.width?.message}
        type="number"
        name={widthName}
        register={register(dimensionRules)}
      />
      <InputBase
        defaultValue={viewport?.height}
        isRequired
        placeholder="Height"
        errorMessage={error?.height?.message}
        type="number"
        name={heigthName}
        register={register(dimensionRules)}
      />
      {totalLen > 1 && <MinusButton onClick={() => remove(index)} />}
    </Flex>
  );
};

const ViewPortInputs: React.FC<Props> = ({ register, control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray<Viewport>({
    control,
    name: 'viewports',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({});
    }
  }, [fields, append]);

  return (
    <FormControl isRequired>
      <FormLabel>Viewports (width - height order) | Number between 300 and 10000</FormLabel>
      <Grid gridGap="1em">
        {fields.map((viewport: Partial<Viewport & { id: string | number | null | undefined }>, index: number) => (
          <ViewportInput
            error={errors?.[index]}
            key={viewport.id}
            remove={remove}
            register={register}
            viewport={viewport}
            index={index}
            totalLen={fields.length}
          />
        ))}
      </Grid>
      {fields.length < 6 && (
        <Flex justifyContent="center" mt="1em">
          <PlusButton onClick={() => append({})} />
        </Flex>
      )}
    </FormControl>
  );
};

export type { Viewport };
export default ViewPortInputs;
