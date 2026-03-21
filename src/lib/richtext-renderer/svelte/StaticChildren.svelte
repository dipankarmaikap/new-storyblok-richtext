<script lang="ts">
import {
  isSelfClosing,
} from "../";
  export let specs: readonly any[];
</script>

{#each specs as spec, i}
  {@const { tag: StaticTag, attrs: staticAttrs, staticChildren } = spec}
  {@const { style: staticStyle, ...staticRest } = staticAttrs || {}}

  <svelte:element this={StaticTag} {...staticRest} style={staticStyle}>
    {#if !isSelfClosing(StaticTag)}
      {#if staticChildren && staticChildren.length > 0}
        <svelte:self specs={staticChildren}>
          {#if i === 0}
            <slot />
          {/if}
        </svelte:self>
      {:else if i === 0}
          <slot />
      {/if}
    {/if}
  </svelte:element>
{/each}
