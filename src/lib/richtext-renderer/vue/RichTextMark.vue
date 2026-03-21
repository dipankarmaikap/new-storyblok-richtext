<script setup lang="ts">
import { computed, h, type VNode } from "vue";
import type { PMNode, StoryblokRichTextComponentMap } from "..";
import {
  resolveMarkTag,
  styleStringToObject,
  transformAttrs,
} from "../../utils";

interface RichTextMarkProps {
  node: PMNode;
  components?: StoryblokRichTextComponentMap;
}

const props = defineProps<RichTextMarkProps>();

const renderMarks = (): string | VNode => {
  const marks = props.node.marks ?? [];
  let element: string | VNode = props.node.text ?? "";

  for (let i = marks.length - 1; i >= 0; i--) {
    const mark = marks[i];
    const Tag = resolveMarkTag(mark);
    const { style, ...rest } = transformAttrs(mark.attrs, {
      markType: mark.type,
    });
    element = h(Tag, { ...rest, style: styleStringToObject(style) }, element);
  }

  return element;
};

const finalRender = computed(() => renderMarks());
</script>

<template>
  <component :is="finalRender" />
</template>
