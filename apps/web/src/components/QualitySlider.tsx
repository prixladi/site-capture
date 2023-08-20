import React, { Ref, useEffect, useState } from 'react';
import { Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel } from '@chakra-ui/react';
import { RegisterOptions } from 'react-hook-form';

type ForcedQuality = {
  value: number;
};

type Props = {
  register: (rules?: RegisterOptions) => Ref<HTMLInputElement>;
  defaultQuality?: number;
  forcedQuality?: ForcedQuality | null;
};

const _defaultQuality = 100;

const QualitySlider: React.FC<Props> = ({ register, defaultQuality, forcedQuality }: Props) => {
  const [value, setValue] = useState(_defaultQuality);
  //const {actions, state} = useSlider({min: 1, max: 100, value: value });

  useEffect(() => {
    if (forcedQuality) {
      setValue(forcedQuality.value);
    }
  }, [forcedQuality, setValue]);

  return (
    <FormControl id="quality" isRequired>
      <FormLabel>Image quality</FormLabel>
      <Slider
        onChange={(num) => setValue(num)}
        name="quality"
        aria-label="slider-ex-1"
        defaultValue={defaultQuality ?? _defaultQuality}
        value={value}
        min={1}
        max={100}
        ref={register({ required: true, setValueAs: parseInt })}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text fontWeight="500" textAlign="center">
        {value}
      </Text>
    </FormControl>
  );
};

export type { ForcedQuality };
export default QualitySlider;
