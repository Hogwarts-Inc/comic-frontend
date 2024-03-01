import React from 'react';

import withCanvaData from 'src/hoc/withCanvaData';
import useAppAuthentication from 'src/hooks/useAppAuthentication';
import { BasicProps, getProps } from 'src/utils/getProps';
import DesignEditor from 'src/views/DesignEditor/DesignEditor';

export const getServerSideProps = getProps;

const Helper = ({ accessToken }: BasicProps) => {
  useAppAuthentication(accessToken);
  return <DesignEditor />;
};

export default withCanvaData(Helper);
