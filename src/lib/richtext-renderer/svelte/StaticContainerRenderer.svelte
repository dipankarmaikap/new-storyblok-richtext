<script lang="ts">
  import { isSelfClosing } from "@/lib/richtext-renderer";
  import StaticContainerRenderer from "./StaticContainerRenderer.svelte";

  export interface StaticChild {
    readonly tag: string;
    readonly attrs?: Record<string, any>;
    readonly staticChildren?: readonly StaticChild[];
  }

  export let staticChildren: readonly StaticChild[];
  export let attrs: Record<string, any> = {};

  const [current, ...rest] = staticChildren ?? [];

  const Tag = current?.tag;
  const selfClosing = isSelfClosing(Tag);

  // merge attrs like Astro version
  const mergedAttrs = {
    ...(current?.attrs ?? {}),
    ...attrs
  };
</script>

{#if Tag}
  {#if selfClosing}
      <svelte:element this={Tag} {...mergedAttrs} />
      <StaticContainerRenderer staticChildren={rest}>
        <slot />
      </StaticContainerRenderer>
  {:else}
    <svelte:element this={Tag} {...mergedAttrs}>
      <StaticContainerRenderer staticChildren={rest}>
        <slot />
      </StaticContainerRenderer>
    </svelte:element>
  {/if}
{:else}
  <slot />
{/if}
