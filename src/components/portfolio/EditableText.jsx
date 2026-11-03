import React from "react";

export const EditableText = ({
  value,
  onChange,
  className = "",
  style = {},
  tag: Tag = "span",
  placeholder = "Click to edit...",
  disabled = false,
}) => {
  if (disabled || !onChange) {
    return (
      <Tag className={className} style={style}>
        {value || placeholder}
      </Tag>
    );
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const newText = e.currentTarget.textContent?.trim();
        if (newText !== undefined && newText !== value && onChange) {
          onChange(newText);
        }
      }}
      className={`cursor-text hover:outline-dashed hover:outline-1 hover:outline-blue-400 focus:outline-solid focus:outline-2 focus:outline-blue-500 rounded px-0.5 transition-all ${className}`}
      style={style}
      title="Click to edit directly"
    >
      {value || placeholder}
    </Tag>
  );
};

export default EditableText;
