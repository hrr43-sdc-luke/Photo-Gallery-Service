import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../src/index';
import PhotoGrid from '../src/components/PhotoGrid';

Enzyme.configure({ adapter: new Adapter() });

// want to test that the array of objects has more than 9 objects for each experience
describe('Experience Photo List ', () => {
  Enzyme.shallow(<App photoGrid={[]} />);

  it('should have > 9 photos', () => {
    const photos = Enzyme.shallow(<PhotoGrid photos />);
    expect(photos.length > 9).toBeTruthy();
  });
});
