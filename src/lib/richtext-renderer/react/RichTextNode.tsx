import React, { type JSX } from "react";
import {
  type PMNode,
  type StoryblokRichTextComponentMap,
  isSelfClosing,
} from "..";
import {
  getStaticChildren,
  resolveComponent,
  resolveTag,
  styleStringToObject,
  transformAttrs,
} from "../utils";
import RichTextMark from "./RichTextMark";
import { toReactProps } from "./react-utils";

interface RichTextNodeProps {
  node: PMNode;
  components?: StoryblokRichTextComponentMap;
}

const RichTextNode: React.FC<RichTextNodeProps> = ({ node, components }) => {
  if (node.type === "text") {
    return <RichTextMark node={node} components={components} />;
  }

  const NodeComponent = resolveComponent(node.type, components);
  if (NodeComponent) {
    return <NodeComponent {...node} components={components} />;
  }

  const Tag = resolveTag(node);
  const { style, ...rest } = transformAttrs(node.attrs, {
    nodeType: node.type,
  });

  const reactProps = toReactProps(rest);

  const dynamicChildren =
    node.content?.map((child, idx) => (
      <RichTextNode key={idx} node={child} components={components} />
    )) ?? [];

  const staticChildrenSpec = getStaticChildren(node.type);

  const renderStatic = (
    specs: readonly any[],
    dynamicContent: React.ReactNode[],
  ): React.ReactNode => {
    if (!specs || specs.length === 0) {
      return dynamicContent;
    }

    return specs.map((spec, i) => {
      const { tag: StaticTag, attrs: staticAttrs, staticChildren } = spec;
      const { style: staticStyle, ...staticRest } = staticAttrs || {};
      const staticReactProps = toReactProps(staticRest);

      const content = renderStatic(
        staticChildren,
        i === 0 ? dynamicContent : [],
      );

      return React.createElement(
        StaticTag,
        {
          key: i,
          ...staticReactProps,
          style: styleStringToObject(staticStyle),
        },
        isSelfClosing(StaticTag) ? undefined : content,
      );
    });
  };

  const children =
    staticChildrenSpec.length > 0
      ? renderStatic(staticChildrenSpec, dynamicChildren)
      : dynamicChildren;

  return React.createElement(
    Tag,
    { ...reactProps, style: styleStringToObject(style) },
    isSelfClosing(Tag) ? undefined : children,
  );
};

export default RichTextNode;
