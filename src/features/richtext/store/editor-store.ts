"use client"

import { atom } from 'jotai'
import { Path } from 'slate';

export interface SelectedBlock {
  path?: Path;
  props: Record<string, any>;
}

export const selectedBlockAtom = atom<SelectedBlock | null>(null);