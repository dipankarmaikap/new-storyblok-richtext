import ReactRichTextRenderer from "@/lib/richtext-renderer/react/ReactRichTextRenderer";
import type { StoryblokRichTextJson } from "@/lib/richtext-renderer";
import CustomHeading from "./react/CustomHeading";
import BlokResolver from "@/components/react/BlokResolver";

export default function ReactRichText({ doc }: { doc: StoryblokRichTextJson }) {
  return (
    <section className="react">
      <h2 className="text-2xl font-bold mb-4 text-sky-600">
        React Renderer Output (with Custom Components)
      </h2>
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-none">
        <ReactRichTextRenderer
          doc={doc}
          components={{
            heading: CustomHeading,
            blok: BlokResolver,
          }}
        />
      </div>
    </section>
  );
}
