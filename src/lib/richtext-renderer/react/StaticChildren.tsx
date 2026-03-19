import React, { type JSX } from "react";
import { styleStringToObject, transformAttrs } from "../utils";
import { isSelfClosing } from "../isSelfClosing";

interface StaticChildSpec {
  tag: keyof JSX.IntrinsicElements;
  attrs?: Record<string, any>;
  staticChildren?: readonly StaticChildSpec[];
}

interface StaticChildrenProps {
  childrenSpec: readonly StaticChildSpec[];
  children?: React.ReactNode;
}

const StaticChildren: React.FC<StaticChildrenProps> = ({ childrenSpec, children }) => {
 
  return (
    <>
      {childrenSpec.map((child, idx) => {
        const Tag = child.tag;
        const {style,...rest} = transformAttrs(child.attrs);
        if (isSelfClosing(Tag)) {
          return <Tag {...rest} style={styleStringToObject(style)} key={idx} />;
        }
        
        return (
          <Tag {...rest} style={styleStringToObject(style)} key={idx}>
            {child.staticChildren?.length ? <StaticChildren childrenSpec={child.staticChildren} /> : null}
            {children}
          </Tag>
        );
      })}
    </>
  );
};

export default StaticChildren;
