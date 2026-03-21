<script lang="ts">
import { defineComponent, h, type PropType, type VNode } from "vue";
import type { PMNode, StoryblokRichTextComponentMap } from "..";
import {
  getStaticChildren,
  isSelfClosing,
  resolveComponent,
  resolveTag,
  styleStringToObject,
  transformAttrs,
} from "../../utils";
import RichTextMark from "./RichTextMark.vue";

// Self-reference for recursion
import RichTextNode from "./RichTextNode.vue";

export default defineComponent({
  name: "RichTextNode",
  props: {
    node: {
      type: Object as PropType<PMNode>,
      required: true,
    },
    components: {
      type: Object as PropType<StoryblokRichTextComponentMap>,
    },
  },
  setup(props) {
    const renderFn = (): VNode | string | null => {
      const { node, components } = props;

      if (node.type === "text") {
        return h(RichTextMark, { node, components });
      }

      const NodeComponent = resolveComponent(node.type, components);
      if (NodeComponent) {
        return h(NodeComponent, { ...node, components });
      }

      const Tag = resolveTag(node);
      const { style, ...rest } = transformAttrs(node.attrs, {
        nodeType: node.type,
      });

      const dynamicChildren =
        node.content?.map((child, idx) =>
          h(RichTextNode, { key: idx, node: child, components }),
        ) ?? [];

      const staticChildrenSpec = getStaticChildren(node.type);

      const renderStatic = (
        specs: readonly any[],
        dynamicContent: VNode[],
      ): VNode[] => {
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
            { ...staticRest, style: styleStringToObject(staticStyle) },
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
        { ...rest, style: styleStringToObject(style) },
        isSelfClosing(Tag) ? undefined : children,
      );
    };

    return renderFn;
  },
});
</script>
