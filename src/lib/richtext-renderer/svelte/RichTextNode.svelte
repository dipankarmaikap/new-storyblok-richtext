<script lang="ts">
  import {
    resolveComponent,
    type PMNode,
    type StoryblokRichTextComponentMap,
  } from "../";

  import TextRenderer from "./TextRenderer.svelte";
  import StandardNodeRenderer from "./StandardNodeRenderer.svelte";

  export let node: PMNode;
  export let components: StoryblokRichTextComponentMap | undefined;

  const NodeComponent = resolveComponent(node.type, components);
</script>

{#if node.type === "text"}
  <TextRenderer {node} {components} />

{:else if NodeComponent}
  <svelte:component this={NodeComponent} {...node} {components} />

{:else}
  <StandardNodeRenderer {node} {components} />
{/if}
