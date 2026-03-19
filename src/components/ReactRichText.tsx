import ReactRichTextRenderer from '../lib/richtext-renderer/react/ReactRichTextRenderer'
import type { StoryblokRichTextJson } from '../lib/richtext-renderer'
import CustomHeading from './CustomHeading.tsx'

export default function ReactRichText({ doc }: { doc: StoryblokRichTextJson }) {
  return (
    <ReactRichTextRenderer doc={doc} components={{
        heading:CustomHeading
    }} />
  )
}
