import React from 'react';

import withCanvaData from 'src/hoc/withCanvaData';
import DesignEditor from 'src/views/DesignEditor';

function Editor() {
  return <DesignEditor />;
}

export default withCanvaData(Editor);
