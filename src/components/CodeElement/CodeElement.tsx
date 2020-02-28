import React from "react";

export const CodeElement = (props: any): JSX.Element => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const DefaultElement = (props: any): JSX.Element => {
  return <p {...props.attributes}>{props.children}</p>;
};
