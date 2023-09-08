import { useStyletron, styled } from 'baseui';
import { Block } from 'baseui/block';
import { useTranslation } from 'react-i18next';

import Icons from '../../../../components/Icons';
import Scrollable from '../../../../components/Scrollable';
import { BASE_ITEMS, PanelType, VIDEO_PANEL_ITEMS } from '../../../../constants/app-options';
import useAppContext from '../../../../hooks/useAppContext';
import useEditorType from '../../../../hooks/useEditorType';
import useSetIsSidebarOpen from '../../../../hooks/useSetIsSidebarOpen';

const Container = styled('div', props => ({
  width: '80px',
  backgroundColor: props.$theme.colors.primary100,
  display: 'flex',
  flex: 'none',
}));

const PanelListItem = ({
  label,
  icon,
  activePanel,
  name,
}: {
  label: string;
  icon: string;
  name: PanelType;
  activePanel: PanelType;
}) => {
  const { setActivePanel } = useAppContext();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const [, theme] = useStyletron();
  const Icon = Icons[icon];
  return (
    <Block
      id="EditorPanelList"
      onClick={() => {
        setIsSidebarOpen(true);
        setActivePanel(name);
      }}
      $style={{
        width: '80px',
        height: '80px',
        backgroundColor: name === activePanel ? theme.colors.white : theme.colors.primary100,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: '0.8rem',
        userSelect: 'none',
        transition: 'all 0.5s',
        gap: '0.1rem',
        ':hover': {
          cursor: 'pointer',
          backgroundColor: theme.colors.white,
          transition: 'all 1s',
        },
      }}>
      <Icon size={24} />
      <div>{label}</div>
    </Block>
  );
};

const PanelsList = () => {
  const { activePanel } = useAppContext();
  const { t } = useTranslation('editor');
  const editorType = useEditorType();
  const PANEL_ITEMS = editorType === 'VIDEO' ? VIDEO_PANEL_ITEMS : BASE_ITEMS;
  return (
    <Container>
      <Scrollable autoHide={true}>
        {PANEL_ITEMS.map(panelListItem => (
          <PanelListItem
            label={t(`panels.panelsList.${panelListItem.id}`)}
            name={panelListItem.name as PanelType}
            key={panelListItem.name}
            icon={panelListItem.name}
            activePanel={activePanel}
          />
        ))}
      </Scrollable>
    </Container>
  );
};

export default PanelsList;
