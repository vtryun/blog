import { Stack, Typography } from '@mui/material';
import { useAtomValue, useAtom } from 'jotai';
import { Transforms } from 'slate';
import { selectedBlockAtom } from '../store/editor-store';
import { AlertSetting } from './settings/alert-setting';
import { CodeSetting } from './settings/code-setting';
import MainSetting from './settings/main-setting';
import { CustomEditor } from '../types/custom-types';
import { useSlateStatic } from 'slate-react';

const settingRegistry: Record<string, React.FC<any>> = {
  alert: AlertSetting,
  main: MainSetting,
  'code-block': CodeSetting,
};

export default function RichtextEditorSetting() {
  const [selectedBlock, setSelectedBlock] = useAtom(selectedBlockAtom);
  const editor = useSlateStatic();
  const type = selectedBlock?.props.type ?? 'main';
  const props = selectedBlock?.props ?? {};
  const path = selectedBlock?.path;

  const updateBlock = (newProps: Record<string, any>) => {
    if (!editor || !path) return;
    const merged = { ...props, ...newProps };
    Transforms.setNodes(editor, merged, { at: path });
    setSelectedBlock({ ...selectedBlock!, props: merged });
  };

  const SettingComponent = settingRegistry[type] ?? MainSetting;

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Typography variant="caption">{type}</Typography>
      <SettingComponent props={props} update={updateBlock} />
    </Stack>
  );
}
