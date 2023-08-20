import { shallow } from 'enzyme';
import React from 'react';

import Button from '../../src/components/Button';

describe('Button Component', () => {
  it('Text test', () => {
    const testText = 'test';
    const component = shallow(<Button>{testText}</Button>);

    const flex = component.find('Flex');
    expect(flex).toHaveLength(1);

    const button = flex.dive().find('Button');
    expect(button).toHaveLength(1);
    expect(button.text()).toBe(testText);
  });

  it('Submit test', () => {
    const testText = 'test';
    const component = shallow(<Button submit>{testText}</Button>);

    const flex = component.find('Flex');
    expect(flex).toHaveLength(1);

    const button = flex.dive().find('Button');
    expect(button).toHaveLength(1);
    expect(button).toHaveProperty('type');
    expect(button.prop('type')).toBe('submit');
  });

  it('Non submit test', () => {
    const testText = 'test';
    const component = shallow(<Button>{testText}</Button>);

    const flex = component.find('Flex');
    expect(flex).toHaveLength(1);

    const button = flex.dive().find('Button');
    expect(button).toHaveLength(1);
    expect(button.prop('type')).toBeUndefined();
  });
});
