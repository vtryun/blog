import { useEffect } from 'react';
import { ReactEditor } from 'slate-react';
import { CustomEditor } from '../types/custom-types';

/**
 * 通用点击外部检测 Hook（支持 Slate + MUI Portal）
 *
 * @param editor - Slate 编辑器实例
 * @param onOutsideClick - 点击编辑器外部时的回调
 * @param excludeIds - 不触发的区域 id 列表（例如 ['block-selector-area', 'block-setting-area']）
 */
export const useClickOutsideBlock = (
  editor: CustomEditor,
  onOutsideClick: () => void,
  excludeIds: string[] = []
) => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      try {
        const target = e.target as Node;
        const editorDom = ReactEditor.toDOMNode(editor, editor);

        // 点击编辑器内部 → 忽略
        if (editorDom.contains(target)) return;

        // 点击在排除 id 区域内 → 忽略
        const isExcluded = excludeIds.some((id) => {
          const el = document.getElementById(id);
          return el?.contains(target);
        });
        if (isExcluded) return;

        // ✅ 点击在 MUI Portal 菜单内 → 忽略
        const isInMuiPortal =
          !!(target instanceof HTMLElement &&
            target.closest('.MuiPopover-root, .MuiMenu-root, .MuiModal-root'));
        if (isInMuiPortal) return;

        // 其余情况 → 外部点击
        onOutsideClick();
      } catch {
        // 忽略意外
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [editor, onOutsideClick, excludeIds]);
};
