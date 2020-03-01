import React from "react";

export const Leaf = (props: any): JSX.Element => {
  const leafStyle = () => {
    if (props.leaf.bold) {
      return <strong>{props.children}</strong>;
    }

    if (props.leaf.code) {
      return <code>{props.children}</code>;
    }

    if (props.leaf.italic) {
      return <em>{props.children}</em>;
    }

    if (props.leaf.underline) {
      return <u>{props.children}</u>;
    }
    return props.children;
  };
  return <span {...props.attributes}>{leafStyle()}</span>;
};
