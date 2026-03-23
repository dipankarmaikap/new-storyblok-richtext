<script lang="ts">
  import SvelteRichTextRenderer from "@/lib/richtext-renderer/svelte/SvelteRichTextRenderer.svelte";
  import CustomBlok from "./svelte/CustomBlok.svelte";
  import type { StoryblokRichTextJson } from "@/lib/richtext-renderer";
  
	let { doc }: { doc: StoryblokRichTextJson } = $props();

</script>



<section class="astro">
  <h2 class="text-2xl font-bold mb-4 text-purple-600">
    Svelte Renderer Output (with Custom Components)
  </h2>
  <div
    class="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-none"
  >
<SvelteRichTextRenderer doc={doc} components={{
  blok: CustomBlok,
}} />
  </div>
</section>
