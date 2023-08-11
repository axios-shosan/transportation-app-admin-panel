import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';
import React from 'react';
import InputWithIcon from './data-entries/InputWithIcon';

type Props = {};

export default function AutofillAdress({}: Props) {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <form action="">
        <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_PUBLIC_ACCESS_TOKEN}
        />
      </form>
    </div>
  );
}
