<script lang="ts">
  import {
    getStaticChildren,
    isSelfClosing,
    resolveTag,
    transformAttrs, 
    type PMNode, 
    type StoryblokRichTextComponentMap
  } from "../";

  import RichTextNode from "./RichTextNode.svelte";
  import StaticContainerRenderer from "./StaticContainerRenderer.svelte";

  export let node: PMNode;
  export let components: StoryblokRichTextComponentMap | undefined;

  const Tag = resolveTag(node);
  const attrs = transformAttrs(node.attrs, { nodeType: node.type });
  const selfClosing = isSelfClosing(Tag);
  const staticChildren = getStaticChildren(node.type);
  const hasStaticChildren = staticChildren.length > 0;
</script>

{#if Tag}
  {#if selfClosing}
    <svelte:element this={Tag} {...attrs} />
  {:else}
    <svelte:element this={Tag} {...attrs}>
      {#if hasStaticChildren}
        <StaticContainerRenderer {attrs} {staticChildren}>
          {#if node.content}
            {#each node.content as childNode}
              <RichTextNode {childNode} {components} node={childNode} />
            {/each}
          {/if}
        </StaticContainerRenderer>
      {:else}
        {#if node.content}
          {#each node.content as childNode}
            <RichTextNode node={childNode} {components} />
          {/each}
        {/if}
      {/if}
    </svelte:element>
  {/if}
{/if}
