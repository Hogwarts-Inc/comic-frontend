import React from 'react';

import { useEditor } from '@layerhub-io/react';
import { Block } from 'baseui/block';
import { Button, SIZE, KIND } from 'baseui/button';
import { PLACEMENT, StatefulTooltip } from 'baseui/tooltip';

import UnlockedIcon from '../../../../components/Icons/Unlocked';

function Locked() {
  const editor = useEditor();

  return (
    <Block
      $style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        justifyContent: 'flex-end',
      }}>
      <StatefulTooltip placement={PLACEMENT.bottom} showArrow accessibilityType="tooltip" content="Unlock">
        <Button
          onClick={() => {
            editor.objects.unlock();
          }}
          size={SIZE.mini}
          kind={KIND.tertiary}>
          <UnlockedIcon size={24} />
        </Button>
      </StatefulTooltip>
    </Block>
  );
}

export default Locked;
