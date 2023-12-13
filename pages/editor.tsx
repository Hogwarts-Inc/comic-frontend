import React from 'react';

import withAuth from 'src/hoc/withAuth';
import DesignEditor from 'src/views/DesignEditor';

function Editor() {
  return <DesignEditor />;
}

export default withAuth(Editor);
