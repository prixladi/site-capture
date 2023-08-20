import { shallow } from 'enzyme';
import React from 'react';

import GoogleButton from '../../src/components/GoogleButton';

jest.mock('../../src/hooks/useEssentials', () =>
  jest.fn(() => ({
    router: {},
    authManager: {},
    apollo: {},
  })),
);

describe('Google Button Component', () => {
  it('SSR & SSG empty', () => {
    const component = shallow(<GoogleButton render={() => <div />} />);
    expect(component.isEmptyRender()).toBe(true);
  });
});
