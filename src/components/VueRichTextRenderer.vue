<script setup lang="ts">
import { h } from "vue";
import { VueRichTextRenderer } from "@/lib/richtext-renderer/vue";
import { sampleDoc } from "../data/sampleDoc";
import type { StoryblokRichTextJson } from "@/lib/richtext-renderer";

const doc = sampleDoc as StoryblokRichTextJson;
// Example of custom component mapping
const components = {
  blok: (props) => {
    const componentName = props.body?.[0]?.component ?? "unknown";
    return h(
      "div",
      { class: "custom-blok" },
      `Vue: Custom blok component - ${componentName}`,
    );
  },
};
</script>

<template>
  <VueRichTextRenderer :doc="doc" :components="components" />
</template>
