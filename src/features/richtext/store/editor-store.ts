"use client"

import { atom } from 'jotai'
import { Path } from 'slate';

export interface SelectedBlock {
  path?: Path;
  props: Record<string, any>;
}

export interface MainSetting {
  title: string;
  categoryName: string;
  tagNames: string;
  status: 'DRAFT' | 'PUBLISHED';
}

export const selectedBlockAtom = atom<SelectedBlock | null>(null);


export const mainSettingAtom = atom<MainSetting>({
  title: '',
  categoryName: '',
  tagNames: '',
  status: 'DRAFT',
});