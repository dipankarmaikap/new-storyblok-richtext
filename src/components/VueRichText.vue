<script setup lang="ts">
import { h } from "vue";
import { VueRichTextRenderer } from "@/lib/richtext-renderer/vue";
import type { StoryblokRichTextJson } from "@/lib/richtext-renderer";
import CustomBlok from "./vue/CustomBlok.vue";
import CustomHeadingVue from "@/components/vue/CustomHeading.vue";
const props = defineProps<{
  doc: StoryblokRichTextJson;
}>();

const components = {
  blok: CustomBlok,
  heading: CustomHeadingVue,
};
</script>

<template>
  <section class="astro">
    <h2 class="text-2xl font-bold mb-4 text-purple-600">
      Vue Renderer Output (with Custom Components)
    </h2>
    <div
      class="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-none"
    >
      <VueRichTextRenderer :doc="props.doc" :components="components" />
    </div>
  </section>
</template>
