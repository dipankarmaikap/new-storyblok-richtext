import React, { type JSX } from "react";
import type { PMMark, PMNode, StoryblokRichTextComponentMap } from "../";
import { resolveMarkTag, styleStringToObject, transformAttrs } from "../utils";

interface RichTextMarkProps {
  node: Extract<PMNode, { type: "text" }>;
  components?: StoryblokRichTextComponentMap;
}

const RichTextMark: React.FC<RichTextMarkProps> = ({ node, components }) => {
  const marks = node?.marks ?? [];

  function GetComponent(mark: PMMark) {
    return components?.[mark.type] as React.ComponentType<any> | undefined;
  }

  let content: any = node?.text ?? "";
  // Wrap marks inside-out
  for (let i = 0; i < marks.length; i++) {
    const mark = marks[i];
    const CustomComponent = GetComponent(mark);
    if (CustomComponent) {
      content = (
        <CustomComponent {...mark} components={components}>
          {content}
        </CustomComponent>
      );
      continue;
    }
    const Tag = resolveMarkTag(mark) as keyof JSX.IntrinsicElements;

    const { style, ...rest } = transformAttrs(mark.attrs, {
      markType: mark.type,
    });

    content = React.createElement(
      Tag,
      { ...rest, style: styleStringToObject(style) },
      content,
    );
  }
  return <>{content}</>;
};

export default RichTextMark;
