<script lang="ts">
  import type { StoryblokRichTextJson, StoryblokRichTextComponentMap } from "..";
  import RichTextNode from "./RichTextNode.svelte";

  export let doc: StoryblokRichTextJson;
  export let components: StoryblokRichTextComponentMap | undefined = undefined;

  const content = doc?.content ?? [];
</script>

{#if content.length > 0}
  {#each content as node, i (i)}
    <RichTextNode {node} {components} />
  {/each}
{:else}
  <p>No content to display</p>
{/if}
