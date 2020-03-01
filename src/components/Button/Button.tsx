import React from "react";
import "./Button.scss";

interface Props {
  active: boolean;
  handler: () => void;
  text: string;
}

export const Button = ({ active, handler, text }: Props) => {
  return (
    <button onClick={handler} className={active ? "active" : "inactive"}>
      {text}
    </button>
  );
};
