import { useMemo, useState, useCallback } from "react";
import { withReact } from "slate-react";
import { createEditor, Node, Transforms, Editor, Text } from "slate";
import { CodeElement, DefaultElement } from "../CodeElement/CodeElement";
import { Leaf } from "../Leaf/Leaf";

type Formatation = "bold" | "code";

export function useTextEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [
        { text: "This is " },
        { text: "my ", underline: true },
        { text: "rich", bold: true },
        { text: " text editor!", italic: true },
        { text: " Enjoy!", code: true }
      ]
    }
  ]);

  const markByFormat = (format: "code" | "bold" | "italic" | "underline") => {
    const isActive = isMarked(format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isMarked = (format: "code" | "bold" | "italic" | "underline") => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] : false;
  };

  function handleKeyDown(event: any) {
    if (!event.ctrlKey) {
      return;
    }
    event.preventDefault();

    switch (event.key) {
      case "`": {
        markByFormat("code");
        break;
      }

      case "b": {
        markByFormat("bold");
        break;
      }

      case "i": {
        markByFormat("italic");
        break;
      }

      case "u": {
        markByFormat("underline");
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

  return {
    editor,
    value,
    setValue,
    handleKeyDown,
    renderElement,
    renderLeaf,
    code: {
      active: isMarked("code"),
      handleCode: () => markByFormat("code")
    },
    bold: {
      active: isMarked("bold"),
      handleBold: () => markByFormat("bold")
    },
    italic: {
      active: isMarked("italic"),
      handleItalic: () => markByFormat("italic")
    },
    underline: {
      active: isMarked("underline"),
      handleUnderline: () => markByFormat("underline")
    }
  } as const;
}
