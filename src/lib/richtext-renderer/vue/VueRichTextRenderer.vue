<script setup lang="ts">
import type { StoryblokRichTextJson, StoryblokRichTextComponentMap } from "..";
import RichTextNode from "./RichTextNode.vue";

interface RichTextRendererProps {
  doc: StoryblokRichTextJson;
  components?: StoryblokRichTextComponentMap;
}

const props = defineProps<RichTextRendererProps>();

const content = props.doc?.content ?? [];
</script>

<template>
  <template v-if="content.length > 0">
    <RichTextNode
      v-for="(node, idx) in content"
      :key="idx"
      :node="node"
      :components="components"
    />
  </template>
  <p v-else>No content to display</p>
</template>
