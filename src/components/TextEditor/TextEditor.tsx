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
    handleCode,
    handleBold
  } = useTextEditor();

  return (
    <Slate value={value} editor={editor} onChange={value => setValue(value)}>
      <div>
        <button onClick={() => handleBold()}>Bold</button>
        <button onClick={() => handleCode()}>Code Block</button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event: any) => handleKeyDown(event)}
        placeholder="Enter some text…"
      />
    </Slate>
  );
};
