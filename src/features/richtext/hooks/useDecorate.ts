'use client'

import Prism from "prismjs";
import { useCallback } from "react";
import { NodeEntry, DecoratedRange, Node, Element } from "slate";
import { CodeBlockElement } from "@/features/richtext/types/custom-types";
import { normalizeTokens } from "@/features/richtext/utils/normalize-tokens";
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';

const decorateCodeBlock = ([
  block,
  blockPath,
]: NodeEntry<CodeBlockElement>): DecoratedRange[] => {
  const text = block.children.map((line) => Node.string(line)).join('\n');
  const tokens = Prism.tokenize(text, Prism.languages[block.language]);
  const normalizedTokens = normalizeTokens(tokens); // make tokens flat and grouped by line
  const decorations: DecoratedRange[] = [];

  for (let index = 0; index < normalizedTokens.length; index++) {
    const tokens = normalizedTokens[index];

    let start = 0;
    for (const token of tokens) {
      const length = token.content.length;
      if (!length) {
        continue;
      }

      const end = start + length;

      const path = [...blockPath, index, 0];

      decorations.push({
        anchor: { path, offset: start },
        focus: { path, offset: end },
        token: true,
        ...Object.fromEntries(token.types.map((type) => [type, true])),
      });

      start = end;
    }
  }

  return decorations;
};

export const useDecorate = () => {
  return useCallback(([node, path]: NodeEntry) => {
    if (Element.isElement(node) && node.type === 'code-block') {
      return decorateCodeBlock([node, path]);
    }

    return [];
  }, []);
};