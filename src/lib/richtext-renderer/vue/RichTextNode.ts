import { defineComponent, h } from "vue";
import type { PMNode, StoryblokRichTextComponentMap } from "../";
import {
  isSelfClosing,
  getStaticChildren,
  resolveTag,
  styleStringToObject,
  transformAttrs,
} from "@/lib/richtext-renderer";
import RichTextMark from "./RichTextMark";
import { resolveComponent } from "@/lib/richtext-renderer/vue/resolveComponent";

export default defineComponent({
  name: "RichTextNode",
  props: {
    node: {
      type: Object as () => PMNode,
      required: true,
    },
    components: {
      type: Object as () => StoryblokRichTextComponentMap,
      required: false,
    },
  },
  setup(props) {
    const renderNode = (node: PMNode): any => {
      // text node
      if (node.type === "text") {
        return h(RichTextMark, {
          node,
          components: props.components,
        });
      }

      // custom component override
      const NodeComponent = resolveComponent(node.type, props.components);
      if (NodeComponent) {
        return h(NodeComponent, {
          ...node,
          components: props.components,
        });
      }

      // fallback to tag
      const Tag = resolveTag(node);

      const { style, ...rest } = transformAttrs(node.attrs, {
        nodeType: node.type,
      });

      const dynamicChildren =
        node.content?.map((child) => renderNode(child)) ?? [];

      const staticChildrenSpec = getStaticChildren(node.type);

      const renderStatic = (
        specs: readonly any[],
        dynamicContent: any[],
      ): any => {
        if (!specs || specs.length === 0) {
          return dynamicContent;
        }

        return specs.map((spec, i) => {
          const { tag: StaticTag, attrs: staticAttrs, staticChildren } = spec;
          const { style: staticStyle, ...staticRest } = staticAttrs || {};

          const content = renderStatic(
            staticChildren,
            i === 0 ? dynamicContent : [],
          );

          return h(
            StaticTag,
            {
              key: i,
              ...staticRest,
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

      return h(
        Tag,
        {
          ...rest,
          style: styleStringToObject(style),
        },
        isSelfClosing(Tag) ? undefined : children,
      );
    };

    return () => renderNode(props.node);
  },
});
