import type {
  TiptapMarkAttributes,
  TiptapMarkName,
  TiptapNodeAttributes,
  TiptapNodeName,
} from "./richtext-renderer/richtext-types.generated";

// A function that transforms a subset of attributes into a new set of attributes.
type AttributeMapper<T> = (attrs: T) => Record<string, any>;

// A helper to create a style attribute from a style object.
const toStyle = (
  styles: Record<string, string | undefined | null>,
): { style?: string } => {
  const styleString = Object.entries(styles)
    .filter(([, value]) => value != null)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

  return styleString ? { style: styleString } : {};
};

/**
 * Node-specific attribute transformations.
 * These mappers convert Tiptap attributes into valid HTML attributes.
 */
export const nodeAttributeMappers: {
  [K in TiptapNodeName]?: AttributeMapper<TiptapNodeAttributes[K]>;
} = {
  // Special case: map `fallbackImage` to `src` and add `alt`.
  emoji: (attrs) => {
    const { fallbackImage, emoji, name, ...rest } = attrs;
    return {
      ...rest,
      "data-type": "emoji",
      "data-name": name,
      "data-emoji": emoji,
      src: fallbackImage,
      alt: emoji || name,
    };
  },
  // Generic case: map `textAlign` to a style attribute.
  heading: (attrs) => {
    const { textAlign, ...rest } = attrs;
    return { ...rest, ...toStyle({ "text-align": textAlign }) };
  },
  // Generic case: map `textAlign` to a style attribute.
  paragraph: (attrs) => {
    const { textAlign, ...rest } = attrs;
    return { ...rest, ...toStyle({ "text-align": textAlign }) };
  },
};

/**
 * Mark-specific attribute transformations.
 */
export const markAttributeMappers: {
  [K in TiptapMarkName]?: AttributeMapper<TiptapMarkAttributes[K]>;
} = {
  // Special case: `highlight`'s color becomes `background-color`.
  highlight: (attrs) => {
    const { color, ...rest } = attrs;
    return { ...rest, ...toStyle({ "background-color": color }) };
  },
  // Generic case: `textStyle`'s color becomes `color`.
  textStyle: (attrs) => {
    const { color, ...rest } = attrs;
    return { ...rest, ...toStyle({ color }) };
  },
  // For links, filter out storyblok-specific attrs that shouldn't be on the <a> tag.
  link: (attrs) => {
    const { linktype, ...rest } = attrs;
    return rest;
  },
};
