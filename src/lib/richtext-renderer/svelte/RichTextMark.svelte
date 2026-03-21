<script lang="ts">
  import type { PMMark, StoryblokRichTextComponentMap } from "../";
  import { resolveComponent, resolveMarkTag, transformAttrs } from "../";

  export let mark: PMMark;
  export let components: StoryblokRichTextComponentMap | undefined;

  const MarkComponent = resolveComponent(mark.type, components);
  const Tag = !MarkComponent ? resolveMarkTag(mark) : null;

  const attrs = !MarkComponent
    ? transformAttrs(mark.attrs, { markType: mark.type })
    : {};
</script>

{#if MarkComponent}
  <svelte:component this={MarkComponent} {...mark} {components}>
    <slot />
  </svelte:component>

{:else if Tag}
  {#if typeof Tag === "string"}
    <svelte:element this={Tag} {...attrs}>
      <slot />
    </svelte:element>
  {:else}
    <svelte:component this={Tag} {...attrs}>
      <slot />
    </svelte:component>
  {/if}

{/if}
