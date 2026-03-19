import React, { type JSX } from "react";
import { type PMNode, type StoryblokRichTextComponentMap, type RichTextComponentProps, isSelfClosing } from "..";
import { resolveNestedTag, resolveTag, styleStringToObject, transformAttrs } from "../utils";
import RichTextMark from "./RichTextMark";
import StaticChildren from "./StaticChildren";

interface RichTextNodeProps {
  node: PMNode;
  components?: StoryblokRichTextComponentMap;
}

function resolveComponent<K extends PMNode["type"]>(type: K, components?: StoryblokRichTextComponentMap) {
  return components?.[type] as React.ComponentType<RichTextComponentProps<K>> | undefined;
}

const RichTextNode: React.FC<RichTextNodeProps> = ({ node, components }) => {
  // text nodes
  if (node.type === "text") {
    return <RichTextMark node={node} components={components} />;
  }

  // custom component handling
  const CustomComponent = resolveComponent(node.type, components);

  if (CustomComponent) {
    return <CustomComponent {...node} components={components} />;
  }

  const Element = resolveTag(node) as keyof JSX.IntrinsicElements;
  const content = node.content ?? [];
  const mapEntry = resolveNestedTag(node.type);
  const staticChildren = mapEntry && "tag" in mapEntry ? mapEntry.staticChildren : [];
    const {style,...rest} = transformAttrs(node.attrs);

  if (Element) {
    return React.createElement(
      Element,
      { ...rest, style: styleStringToObject(style) },
      isSelfClosing(Element) ? undefined :
      staticChildren.length > 0 ? (
        <StaticChildren
          childrenSpec={staticChildren.map((child: any) => ({
            tag: child.tag,
            attrs: { ...child.attrs, ...node.attrs },
            staticChildren: child.staticChildren,
          }))}
        >
          {content.map((child, idx) => (
            <RichTextNode key={idx} node={child} components={components} />
          ))}
        </StaticChildren>
      ) : (
        content.map((child, idx) => (
          <RichTextNode key={idx} node={child} components={components} />
        ))
      )
    );
  }

  // fallback
  return (
    <div {...rest} style={styleStringToObject(style)}>
      {content.map((child, idx) => (
        <RichTextNode key={idx} node={child} components={components} />
      ))}
    </div>
  );
};

export default RichTextNode;
