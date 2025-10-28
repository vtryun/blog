"use client"

import { atom } from 'jotai'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { Path } from 'slate';
import { withLayout } from '../plugins/with-layout'

export interface SelectedBlock {
  path?: Path;
  props: Record<string, any>;
}

export const selectedBlockAtom = atom<SelectedBlock | null>(null);