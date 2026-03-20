import { expect, test } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import StoryblokRichtext from "./richtext-renderer/astro/AstroRichTextRenderer.astro";

test("render paragraph", async () => {
  const container = await AstroContainer.create();
  const dataWithParagraph = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        attrs: {
          textAlign: null,
        },
        content: [
          {
            text: "You can combine multiple inline styles:",
            type: "text",
          },
        ],
      },
    ],
  };

  const result = await container.renderToString(StoryblokRichtext, {
    props: {
      doc: dataWithParagraph,
    },
  });
  expect(result).toBe(
    `<p style="text-align:null;color:undefined">You can combine multiple inline styles:</p>`,
  );
});
test("render code_block", async () => {
  const container = await AstroContainer.create();
  const dataWithCodeBlock = {
    type: "doc",
    content: [
      {
        type: "code_block",
        attrs: {
          class: null,
        },
        content: [
          {
            text: 'console.log("Hello, world!");',
            type: "text",
          },
        ],
      },
    ],
  };

  const result = await container.renderToString(StoryblokRichtext, {
    props: {
      doc: dataWithCodeBlock,
    },
  });
  expect(result).toBe(
    `<pre style="text-align:undefined;color:undefined"><code style="text-align:undefined;color:undefined">console.log(&quot;Hello, world!&quot;);</code></pre>`,
  );
});
test("render emoji", async () => {
  const container = await AstroContainer.create();
  const dataWithEmoji = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        attrs: {
          textAlign: null,
        },
        content: [
          {
            type: "emoji",
            attrs: {
              name: "white_check_mark",
              emoji: "✅",
              fallbackImage:
                "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
            },
          },
        ],
      },
    ],
  };

  const result = await container.renderToString(StoryblokRichtext, {
    props: {
      doc: dataWithEmoji,
    },
  });
  expect(result).toBe(
    `<p style="text-align:null;color:undefined"><span src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png" style="text-align:undefined;color:undefined" name="white_check_mark" emoji="✅"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png" style="width: 1.25em; height: 1.25em; vertical-align: text-top; display: inline-block;" draggable="false" loading="lazy" name="white_check_mark" emoji="✅"/></span></p>`,
  );
});
