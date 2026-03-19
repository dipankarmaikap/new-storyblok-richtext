import type { PMMark, PMNode, TiptapComponentName } from "./richtext-types.generated";

/** Canonical type for a Storyblok RichText JSON root */
export type StoryblokRichTextJson = Extract<PMNode, { type: 'doc' }>;

/** Typed override map for node/mark components */
export type RichTextComponentProps<T extends TiptapComponentName> =
  (
    T extends PMNode['type']
      ? Extract<PMNode, { type: T }>
      : T extends PMMark['type']
        ? Extract<PMMark, { type: T }>
        : never
  ) & {
    components?: StoryblokRichTextComponentMap;
  };

export type StoryblokRichTextComponentMap = {
  [K in TiptapComponentName]?: (
    props: RichTextComponentProps<K>
  ) => any;
};



/**
 * Parsed DOM Output Specification for a Node or Mark
 */
export interface ParsedDOMSpec {
  tag: string;
  attrs: Record<string, any>;
  staticChildren: Array<ParsedDOMSpec | string | { hole: true }>;
}

export interface SbBlokData {
_key: string;
component: string;
[otherKey: string]: any;
}
