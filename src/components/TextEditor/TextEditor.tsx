import React from "react";
import { Slate, Editable } from "slate-react";
import { useTextEditor } from "./useTextEditor";

export const TextEditor = () => {
  const {
    value,
    editor,
    setValue,
    handleKeyDown,
    renderElement,
    renderLeaf,
    CustomEditor
  } = useTextEditor();

  return (
    <Slate value={value} editor={editor} onChange={value => setValue(value)}>
      <div>
        <button
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleBoldMark();
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock();
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event: any) => handleKeyDown(event)}
      />
    </Slate>
  );
};
