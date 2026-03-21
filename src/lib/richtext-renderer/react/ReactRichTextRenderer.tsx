import React from "react";
import type { StoryblokRichTextJson, StoryblokRichTextComponentMap } from "../";
import RichTextNode from "./RichTextNode";

interface RichTextRendererProps {
  doc: StoryblokRichTextJson;
  components?: StoryblokRichTextComponentMap;
}

const ReactRichTextRenderer: React.FC<RichTextRendererProps> = ({
  doc,
  components,
}) => {
  const content = doc?.content ?? [];
  if (content.length === 0) {
    return <p>No content to display</p>;
  }
  return (
    <>
      {content.map((node, idx) => (
        <RichTextNode key={idx} node={node} components={components} />
      ))}
    </>
  );
};

export default ReactRichTextRenderer;
