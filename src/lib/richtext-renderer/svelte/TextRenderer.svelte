<script lang="ts">
  import type { PMNode, PMMark, StoryblokRichTextComponentMap } from "../";
  import RichTextMark from "./RichTextMark.svelte";

  export let node: PMNode;
  export let components: StoryblokRichTextComponentMap | undefined;

  export let marks: PMMark[] | undefined = node.marks;
  export let index = 0;
</script>

{#if node.type === "text"}
  {#if !marks || marks.length === 0}
    {node.text}
  {:else}
    <RichTextMark mark={marks[index]} {components}>
      {#if index === marks.length - 1}
        {node.text}
      {:else}
        <svelte:self {node} {components} {marks} index={index + 1} />
      {/if}
    </RichTextMark>
  {/if}
{/if}
