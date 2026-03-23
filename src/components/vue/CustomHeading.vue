<script setup lang="ts">
import type { RichTextComponentProps } from "@/lib/richtext-renderer";
import RichTextNode from "@/lib/richtext-renderer/vue/RichTextNode";
type HeadingProps = RichTextComponentProps<"heading">;

const props = defineProps({
  node: Object as PropType<HeadingProps["node"]>,
  attrs: Object as PropType<HeadingProps["attrs"]>,
  content: Array as PropType<HeadingProps["content"]>,
  marks: Array as PropType<HeadingProps["marks"]>,
  components: Object as PropType<HeadingProps["components"]>,
});
</script>

<template>
  <div :data-heading="props.attrs.level" class="custom-heading">
    <RichTextNode
      v-for="(child, idx) in props.content"
      :key="idx"
      :node="child"
      :components="props.components"
    />
  </div>
</template>
