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
import { useSelector } from 'react-redux';

import styles from './text.module.css';
import Bold from '../../../../components/Icons/Bold';
import Italic from '../../../../components/Icons/Italic';
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
    <div className={styles.textSizeContainer}>
      <IconButton className={styles.decrementButton} size="small" onClick={() => onChange(value - 1)}>
        <RemoveIcon className={styles.icon} />
      </IconButton>
      <StyledTextField
        className={styles.textSizeTextField}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        type="number"
        variant="standard"
        inputProps={{
          className: styles.inputTextField,
        }}
      />
      <IconButton className={styles.incrementButton} size="small" onClick={() => onChange(value + 1)}>
        <AddIcon className={styles.icon} />
      </IconButton>
    </div>
  );
};

const TEXT_ALIGNS = ['left', 'center', 'right', 'justify'];

const TextAlign = () => {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const [state, setState] = useState<{ align: string }>({ align: 'left' });

  useEffect(() => {
    if (activeObject) {
      setState({ align: activeObject.textAlign });
    }
  }, [activeObject]);
  return (
    <Block backgroundColor={'#ffffff'} display={'grid'} gridTemplateColumns={'1fr 1fr 1fr 1fr'} gridGap={'8px'}>
      <Button
        className={styles.boxButton}
        isSelected={state.align === TEXT_ALIGNS[3]}
        onClick={() => {
          editor.objects.update({ textAlign: TEXT_ALIGNS[3] });
          setState({ align: TEXT_ALIGNS[3] });
        }}
        kind={KIND.tertiary}
        size={SIZE.mini}>
        <TextAlignJustify size={24} />
      </Button>
      <Button
        className={styles.boxButton}
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
        className={styles.boxButton}
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
        className={styles.boxButton}
        isSelected={state.align === TEXT_ALIGNS[2]}
        onClick={() => {
          editor.objects.update({ textAlign: TEXT_ALIGNS[2] });
          setState({ align: TEXT_ALIGNS[2] });
        }}
        kind={KIND.tertiary}
        size={SIZE.mini}>
        <TextAlignRight size={24} />
      </Button>
    </Block>
  );
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
  }, [activeObject, fonts, state]);

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
  }, [editor, activeObject, fonts, state]);

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
    <div className={styles.flexContainer}>
      <div className={styles.flexInnerContainer}>
        {/* 
        <div onClick={() => setActiveSubMenu('FontSelector')} style={{
          border: '1px solid rgb(185,185,185)',
          borderRadius: '4px',
          padding: '0.2rem 0.45rem',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '14px',
          gap: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          height: '24px',
        }}>
          <div>{state.family}</div>
          <div style={{ display: 'flex' }}>
            <ChevronDown size={22} />
          </div>
        </div> 
        */}

        <div className={styles.divider}></div>

        <TextFontSize />

        <div className={styles.divider}></div>

        <TextAlign />

        <div className={styles.divider}></div>

        <div className={styles.gridContainer}>
          <Button
            onClick={() => setActiveSubMenu('TextFill')}
            size={SIZE.mini}
            kind={KIND.tertiary}
            className={styles.boxButton}>
            <TextColor color={state.color} size={22} />
          </Button>

          <Button
            className={styles.boxButton}
            disabled={!state.styleOptions.hasBold}
            onClick={makeBold}
            size={SIZE.mini}
            kind={KIND.tertiary}>
            <Bold size={20} />
          </Button>

          <Button
            className={styles.boxButton}
            disabled={!state.styleOptions.hasItalic}
            onClick={makeItalic}
            size={SIZE.mini}
            kind={KIND.tertiary}>
            <Italic size={20} />
          </Button>

          <Button className={styles.boxButton} onClick={makeUnderline} size={SIZE.mini} kind={KIND.tertiary}>
            <Underline size={24} />
          </Button>
        </div>

        <div className={styles.divider}></div>
      </div>
    </div>
  );
}
