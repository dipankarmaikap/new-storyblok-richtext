import { defineComponent, h } from "vue";
import type { PMMark, PMNode, StoryblokRichTextComponentMap } from "..";
import { resolveMarkTag, styleStringToObject, transformAttrs } from "../utils";

export default defineComponent({
  name: "RichTextMark",
  props: {
    node: {
      type: Object as () => Extract<PMNode, { type: "text" }>,
      required: true,
    },
    components: {
      type: Object as () => StoryblokRichTextComponentMap,
      required: false,
    },
  },
  setup(props) {
    const getComponent = (mark: PMMark) => {
      return props.components?.[mark.type] as any;
    };

    return () => {
      const marks = props.node?.marks ?? [];

      let content: any = props.node?.text ?? "";

      // Wrap marks inside-out (same as React)
      for (let i = 0; i < marks.length; i++) {
        const mark = marks[i];
        const CustomComponent = getComponent(mark);

        if (CustomComponent) {
          content = h(
            CustomComponent,
            {
              ...mark,
              components: props.components,
            },
            () => content,
          );
          continue;
        }

        const Tag = resolveMarkTag(mark);

        const { style, ...rest } = transformAttrs(mark.attrs, {
          markType: mark.type,
        });

        content = h(
          Tag as any,
          {
            ...rest,
            style: styleStringToObject(style),
          },
          content,
        );
      }

      return content;
    };
  },
});
