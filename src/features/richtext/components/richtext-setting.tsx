import { Stack, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { Transforms } from 'slate';
import { selectedBlockAtom } from '../store/editor-store';
import { AlertSetting } from './settings/alert-setting';
import { CodeSetting } from './settings/code-setting';
import MainSetting from './settings/main-setting';
import { useSlateStatic } from 'slate-react';
import { ALERT_TYPE, CODE_BLOCK_TYPE } from '../constants/node-types';

const settingRegistry: Record<string, React.FC<any>> = {
  [ALERT_TYPE]: AlertSetting,
  [CODE_BLOCK_TYPE]: CodeSetting,
};

interface RichtextEditorSettingProps {
  mode: 'create' | 'edit';
  slug?: string;
  title?: string;
  categoryName?: string;
  tagNames?: string;
  status?: 'DRAFT' | 'PUBLISHED';
}

export default function RichtextEditorSetting({
  mode,
  slug,
}: RichtextEditorSettingProps) {
  const [selectedBlock, setSelectedBlock] = useAtom(selectedBlockAtom);
  const editor = useSlateStatic();
  const type = selectedBlock?.props.type ?? 'main';
  const props = selectedBlock?.props ?? {};
  const path = selectedBlock?.path;

  const updateBlock = (newProps: Record<string, any>) => {
    if (!editor || !path || !selectedBlock) return;
    const merged = { ...props, ...newProps };
    Transforms.setNodes(editor, merged, { at: path });
    setSelectedBlock({ ...selectedBlock, props: merged });
  };

  const SettingComponent = settingRegistry[type] ?? MainSetting;

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {mode === 'edit' ? 'Edit Post' : 'Create Post'}
      </Typography>
      {type !== 'main' && <Typography variant="caption">{type}</Typography>}
      {settingRegistry[type] ? (
        <SettingComponent props={props} update={updateBlock} />
      ) : (
        <MainSetting mode={mode} slug={slug} />
      )}
    </Stack>
  );
}
