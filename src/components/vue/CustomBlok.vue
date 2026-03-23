<script setup lang="ts">
import type { RichTextComponentProps } from "@/lib/richtext-renderer";
type BlokProps = RichTextComponentProps<"blok">;

const props = defineProps({
  attrs: Object as PropType<BlokProps["attrs"]>,
  components: Object as PropType<BlokProps["components"]>,
});
</script>

<template>
  <pre class="bg-gray-50 whitespace-pre-wrap max-h-50 overflow-scroll">
    {{ JSON.stringify(props.attrs.body, null, 2) }}
  </pre>
</template>
