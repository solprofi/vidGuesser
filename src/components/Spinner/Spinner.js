import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Spinner = () => {
  return (
    <Dimmer active>
      <Loader
        size='huge'
        content='Loading app...'
      />
    </Dimmer>
  )
}

export default Spinner;
