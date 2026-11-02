import React from "react";

export const EditableHeading = ({
  value,
  fallback,
  onChange,
  className = "",
  style = {},
  tag: Tag = "h2",
}) => {
  const text = value || fallback;

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const newText = e.currentTarget.textContent?.trim();
        if (newText && newText !== text && onChange) {
          onChange(newText);
        }
      }}
      className={`cursor-text hover:outline-dashed hover:outline-1 hover:outline-blue-400 focus:outline-solid focus:outline-2 focus:outline-blue-500 rounded-xs transition-all print:hover:outline-none print:focus:outline-none ${className}`}
      style={style}
      title="Click to edit this heading directly"
    >
      {text}
    </Tag>
  );
};
