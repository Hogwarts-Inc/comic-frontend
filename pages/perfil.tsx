import React from 'react';

import { Carousel } from '../src/components/Carousel/Carousel';

const Profile = () => (
  <div>
    <Carousel
      images={[
        // eslint-disable-next-line max-len
        'https://www.at-languagesolutions.com/en/wp-content/uploads/2016/06/http-1.jpg',
        'https://www.at-languagesolutions.com/en/wp-content/uploads/2016/06/http-1.jpg',
        'https://www.at-languagesolutions.com/en/wp-content/uploads/2016/06/http-1.jpg',
        'https://www.at-languagesolutions.com/en/wp-content/uploads/2016/06/http-1.jpg',
      ]}
    />
  </div>
);

export default Profile;
