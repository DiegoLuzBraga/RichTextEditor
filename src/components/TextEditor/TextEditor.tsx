import React from "react";
import { Slate, Editable } from "slate-react";
import { useTextEditor } from "./useTextEditor";
import "./TextEditor.scss";
import { Button } from "../Button/Button";

export const TextEditor = () => {
  const {
    value,
    editor,
    setValue,
    handleKeyDown,
    renderElement,
    renderLeaf,
    code,
    bold,
    italic,
    underline
  } = useTextEditor();

  return (
    <div className="textEditor">
      <Slate value={value} editor={editor} onChange={value => setValue(value)}>
        <div className="buttons">
          <Button
            handler={() => bold.handleBold()}
            text="B"
            active={bold.active}
          />
          <Button
            handler={() => italic.handleItalic()}
            text="I"
            active={italic.active}
          />
          <Button
            handler={() => underline.handleUnderline()}
            text="U"
            active={underline.active}
          />
          <Button
            handler={() => code.handleCode()}
            text={"< >"}
            active={code.active}
          />
        </div>
        <Editable
          className="editable"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event: any) => handleKeyDown(event)}
          placeholder="Enter some text…"
          spellCheck
          autoFocus
        />
      </Slate>
    </div>
  );
};
