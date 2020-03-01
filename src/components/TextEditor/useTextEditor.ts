import { useMemo, useState, useCallback } from "react";
import { withReact } from "slate-react";
import { createEditor, Node, Transforms, Editor, Text, NodeEntry } from "slate";
import { CodeElement, DefaultElement } from "../CodeElement/CodeElement";
import { Leaf } from "../Leaf/Leaf";

type Formatation = "bold" | "code";

export function useTextEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "O tiririca." }]
    }
  ]);

  const CustomEditor = {
    isBoldMarkActive() {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true
      });

      return !!match;
    },

    isCodeBlockActive() {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === "code"
      });
      return !!match;
    },

    toggleBoldMark() {
      const isActive = CustomEditor.isBoldMarkActive();
      Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      );
    },

    toggleCodeBlock() {
      const isActive = CustomEditor.isCodeBlockActive();
      Transforms.setNodes(
        editor,
        { type: isActive ? null : "code" },
        { match: n => Editor.isBlock(editor, n) }
      );
    }
  };

  function handleKeyDown(event: any) {
    if (!event.ctrlKey) {
      return;
    }
    event.preventDefault();

    switch (event.key) {
      case "`": {
        CustomEditor.toggleCodeBlock();
        break;
      }

      case "b": {
        CustomEditor.toggleBoldMark();
        break;
      }
    }
  }

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return CodeElement(props);
      default:
        return DefaultElement({ ...props });
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return Leaf(props);
  }, []);

  const handleButtonFormat = {
    code: () => CustomEditor.toggleCodeBlock(),
    bold: () => CustomEditor.toggleBoldMark()
  };

  return {
    editor,
    value,
    setValue,
    handleKeyDown,
    renderElement,
    renderLeaf,
    handleCode: () => handleButtonFormat["code"](),
    handleBold: () => handleButtonFormat["bold"]()
  } as const;
}
