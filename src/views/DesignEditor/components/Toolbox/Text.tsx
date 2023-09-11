/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { IStaticText } from '@layerhub-io/types';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Block } from 'baseui/block';
import { Button, SIZE, KIND } from 'baseui/button';
import { StatefulPopover } from 'baseui/popover';
import { StatefulTooltip, PLACEMENT } from 'baseui/tooltip';
import { useSelector } from 'react-redux';

import Bold from '../../../../components/Icons/Bold';
import Italic from '../../../../components/Icons/Italic';
import LetterCase from '../../../../components/Icons/LetterCase';
import TextAlignCenter from '../../../../components/Icons/TextAlignCenter';
import TextAlignJustify from '../../../../components/Icons/TextAlignJustify';
import TextAlignLeft from '../../../../components/Icons/TextAlignLeft';
import TextAlignRight from '../../../../components/Icons/TextAlignRight';
import TextColor from '../../../../components/Icons/TextColor';
import Underline from '../../../../components/Icons/Underline';
import useAppContext from '../../../../hooks/useAppContext';
import { selectAllFonts } from '../../../../store/slices/fonts/selectors';
import { loadFonts } from '../../../../utils/fonts';
import { getTextProperties } from '../../utils/text';

interface TextState {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  family: string;
  styleOptions: StyleOptions;
}

interface StyleOptions {
  hasItalic: boolean;
  hasBold: boolean;
  options: any[];
}

const StyledTextField = styled(TextField)({
  '& .MuiInput-underline:before': {
    display: 'none',
  },
  '&:hover .MuiInput-underline:before': {
    display: 'none',
  },
  '& .MuiInput-underline:after': {
    display: 'none',
  },
});

const StyledRemoveIcon = styled(RemoveIcon)({
  color: '#000',
  fontFamily: 'Inter',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
});

const styles: Record<string, React.CSSProperties> = {
  box: {
    marginTop: '13px',
    marginBottom: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30px',
    width: '81px',
  },
  overlapGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(./rectangle-5.png)',
    backgroundSize: '100% 100%',
    height: '30px',
    width: '40px',
    borderColor: 'rgb(185,185,185)',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  element: {
    fontFamily: 'Inter',
    fontSize: '12px',
    fontWeight: 'bolder',
    paddingTop: '2px',
    paddingBottom: '2px',
    paddingRight: '3px',
    paddingLeft: '3px',
    textAlign: 'center',
    width: '24px',
    height: '13px',
  },
  decrementButton: {
    height: '1px',
    width: '4px',
  },
  incrementButton: {
    height: '6px',
    width: '6px',
  },
  icon: {
    color: '#000',
    fontSize: '12px',
  },
};

const TextFontSize = () => {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const [value, setValue] = useState<number>(12);

  useEffect(() => {
    if (activeObject && activeObject.type === 'StaticText') {
      setValue(activeObject.fontSize);
    }
  }, [activeObject]);

  const onChange = (size: number) => {
    editor.objects.update({ fontSize: size });
    setValue(size);
  };

  return (
    <div style={styles.box}>
      <IconButton style={styles.decrementButton} size="small" onClick={() => onChange(value - 1)}>
        <RemoveIcon style={styles.icon} />
      </IconButton>
      <StyledTextField
        style={styles.overlapGroup}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        type="number"
        variant="standard"
        inputProps={{
          style: {
            ...styles.element,
          },
        }}
      />
      <IconButton style={styles.incrementButton} size="small" onClick={() => onChange(value + 1)}>
        <AddIcon style={styles.icon} />
      </IconButton>
    </div>
  );
};

function TextLetterCase() {
  const [state, setState] = useState<{ upper: boolean }>({ upper: false });
  const editor = useEditor();
  return (
    <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={'tooltip'} content="Letter case">
      <Button
        onClick={() => {
          if (!state.upper) {
            setState({ upper: true });
            editor.objects.toUppercase();
          } else {
            setState({ upper: false });
            editor.objects.toLowerCase();
          }
        }}
        size={SIZE.mini}
        kind={KIND.tertiary}>
        <LetterCase size={24} />
      </Button>
    </StatefulTooltip>
  );
}

const TEXT_ALIGNS = ['left', 'center', 'right', 'justify'];

function TextAlign() {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const [state, setState] = useState<{ align: string }>({ align: 'left' });

  useEffect(() => {
    if (activeObject) {
      setState({ align: activeObject.textAlign });
    }
  }, [activeObject]);
  return (
    <StatefulPopover
      showArrow={true}
      placement={PLACEMENT.bottom}
      content={() => (
        <Block
          padding={'12px'}
          backgroundColor={'#ffffff'}
          display={'grid'}
          gridTemplateColumns={'1fr 1fr 1fr 1fr'}
          gridGap={'8px'}>
          <Button
            isSelected={state.align === TEXT_ALIGNS[0]}
            onClick={() => {
              editor.objects.update({ textAlign: TEXT_ALIGNS[0] });
              setState({ align: TEXT_ALIGNS[0] });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}>
            <TextAlignLeft size={24} />
          </Button>
          <Button
            isSelected={state.align === TEXT_ALIGNS[1]}
            onClick={() => {
              editor.objects.update({ textAlign: TEXT_ALIGNS[1] });
              setState({ align: TEXT_ALIGNS[1] });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}>
            <TextAlignCenter />
          </Button>
          <Button
            isSelected={state.align === TEXT_ALIGNS[2]}
            onClick={() => {
              editor.objects.update({ textAlign: TEXT_ALIGNS[2] });
              setState({ align: TEXT_ALIGNS[2] });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}>
            <TextAlignRight size={24} />
          </Button>
          <Button
            isSelected={state.align === TEXT_ALIGNS[3]}
            onClick={() => {
              editor.objects.update({ textAlign: TEXT_ALIGNS[3] });
              setState({ align: TEXT_ALIGNS[3] });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}>
            <TextAlignJustify size={24} />
          </Button>
        </Block>
      )}
      returnFocus
      autoFocus>
      <Block>
        <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={'tooltip'} content="Align">
          <Button size={SIZE.mini} kind={KIND.tertiary}>
            <TextAlignCenter />
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}

const initialOptions: TextState = {
  family: 'CoreLang',
  bold: false,
  italic: false,
  underline: false,
  color: '#00000',
  styleOptions: {
    hasBold: true,
    hasItalic: true,
    options: [],
  },
};

export default function Text() {
  const [state, setState] = useState<TextState>(initialOptions);
  const activeObject = useActiveObject() as Required<IStaticText>;
  const { setActiveSubMenu } = useAppContext();
  const editor = useEditor();
  const fonts = useSelector(selectAllFonts);

  useEffect(() => {
    if (activeObject && activeObject.type === 'StaticText') {
      const textProperties = getTextProperties(activeObject, fonts);
      setState({ ...state, ...textProperties });
    }
  }, [activeObject]);

  useEffect(() => {
    const watcher = async () => {
      if (activeObject && activeObject.type === 'StaticText') {
        const textProperties = getTextProperties(activeObject, fonts);
        setState({ ...state, ...textProperties });
      }
    };
    if (editor) {
      editor.on('history:changed', watcher);
    }
    return () => {
      if (editor) {
        editor.off('history:changed', watcher);
      }
    };
  }, [editor, activeObject]);

  const makeBold = React.useCallback(async () => {
    if (state.bold) {
      let desiredFont;

      if (state.italic) {
        // look for regular italic
        desiredFont = state.styleOptions.options.find(option => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Italic$/);
        });
      } else {
        // look for  regular
        desiredFont = state.styleOptions.options.find(option => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Regular$/);
        });
      }

      const font = {
        name: desiredFont.post_script_name,
        url: desiredFont.url,
      };
      await loadFonts([font]);

      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.url,
      });
      setState({ ...state, bold: false });
    } else {
      let desiredFont;
      if (state.italic) {
        // look for bold italic
        desiredFont = state.styleOptions.options.find(option => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^BoldItalic$/);
        });
      } else {
        // look for bold
        desiredFont = state.styleOptions.options.find(option => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Bold$/);
        });
      }

      const font = {
        name: desiredFont.post_script_name,
        url: desiredFont.url,
      };
      await loadFonts([font]);

      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.url,
      });
      setState({ ...state, bold: true });
    }
  }, [editor, state]);

  const makeItalic = React.useCallback(async () => {
    if (state.italic) {
      let desiredFont;
      if (state.bold) {
        // Search bold regular
        desiredFont = state.styleOptions.options.find(option => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Bold$/);
        });
      } else {
        // Search regular
        desiredFont = state.styleOptions.options.find(option => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Regular$/);
        });
      }

      const font = {
        name: desiredFont.post_script_name,
        url: desiredFont.url,
      };
      await loadFonts([font]);

      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.url,
      });
      setState({ ...state, italic: false });
    } else {
      let desiredFont;

      if (state.bold) {
        // search italic bold
        desiredFont = state.styleOptions.options.find(option => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^BoldItalic$/);
        });
      } else {
        // search regular italic
        desiredFont = state.styleOptions.options.find(option => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Italic$/);
        });
      }

      const font = {
        name: desiredFont.post_script_name,
        url: desiredFont.url,
      };
      await loadFonts([font]);

      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.url,
      });
      setState({ ...state, italic: true });
    }
  }, [editor, state]);

  const makeUnderline = React.useCallback(() => {
    editor.objects.update({
      underline: !state.underline,
    });
    setState({ ...state, underline: !state.underline });
  }, [editor, state]);

  return (
    <Block
      $style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 12px', justifyContent: 'space-between' }}>
      <Block display={'flex'} gridGap="0.5rem" alignItems={'center'}>
        {/* <Block
          onClick={() => setActiveSubMenu('FontSelector')}
          $style={{
            border: '1px solid rgb(185,185,185)',
            borderRadius: '4px',
            padding: '0.2rem 0.45rem',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
            gap: '0.5rem',
          }}
          height={'24px'}
          display={'flex'}
          alignItems={'center'}>
          <Block>{state.family}</Block>
          <Block display={'flex'}>
            <ChevronDown size={22} />
          </Block>
        </Block> */}

        <div style={{ overflow: 'hidden' }}>
          <TextFontSize />
        </div>

        {/* <Block display={'flex'} alignItems={'center'}>
          <StatefulTooltip
            placement={PLACEMENT.bottom}
            showArrow={true}
            accessibilityType={'tooltip'}
            content="Text color">
            <Button onClick={() => setActiveSubMenu('TextFill')} size={SIZE.mini} kind={KIND.tertiary}>
              <TextColor color={state.color} size={22} />
            </Button>
          </StatefulTooltip>

          <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={'tooltip'} content="Bold">
            <Button
              style={{ ...(!state.bold && { color: 'rgb(169,169,169)' }) }}
              disabled={!state.styleOptions.hasBold}
              onClick={makeBold}
              size={SIZE.mini}
              kind={KIND.tertiary}>
              <Bold size={20} />
            </Button>
          </StatefulTooltip>

          <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={'tooltip'} content="Italic">
            <Button
              style={{ ...(!state.italic && { color: 'rgb(169,169,169)' }) }}
              disabled={!state.styleOptions.hasItalic}
              onClick={makeItalic}
              size={SIZE.mini}
              kind={KIND.tertiary}>
              <Italic size={20} />
            </Button>
          </StatefulTooltip>

          <StatefulTooltip
            placement={PLACEMENT.bottom}
            showArrow={true}
            accessibilityType={'tooltip'}
            content="Underline">
            <Button
              style={{ ...(!state.underline && { color: 'rgb(169,169,169)' }) }}
              onClick={makeUnderline}
              size={SIZE.mini}
              kind={KIND.tertiary}>
              <Underline size={24} />
            </Button>
          </StatefulTooltip>

          <TextLetterCase />

          <Block width={'1px'} height={'24px'} backgroundColor="rgb(213,213,213)" margin={'0 4px'} />

          <TextAlign />

          <Block width={'1px'} height={'24px'} backgroundColor="rgb(213,213,213)" margin={'0 4px'} />
        </Block> */}
      </Block>
    </Block>
  );
}
