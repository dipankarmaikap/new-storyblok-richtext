<script lang="ts">
  import type { RichTextComponentProps } from "@/lib/richtext-renderer";
  export let attrs: RichTextComponentProps<"blok">["attrs"];
  
</script>

<pre class="bg-gray-50 whitespace-pre-wrap max-h-50 overflow-scroll">
  {JSON.stringify(attrs.body, null, 2)}
</pre>
