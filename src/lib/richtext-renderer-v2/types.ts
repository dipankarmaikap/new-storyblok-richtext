import type { MarkType, NodeType } from "./tiptap-render-map.generated";

export type Mark ={
        /**
         * The type of the mark
         */
        type: MarkType;
        /**
         * The attributes of the mark. Attributes can have any JSON-serializable value.
         */
        attrs?: Record<string, any>;
        [key: string]: any;
    }

export type StoryblokRichTextJson = {
    /**
     * The type of the node
     */
    type?: NodeType;
    /**
     * The attributes of the node. Attributes can have any JSON-serializable value.
     */
    attrs?: Record<string, any> | undefined;
    /**
     * The children of the node. A node can have other nodes as children.
     */
    content?: StoryblokRichTextJson[];
    /**
     * A list of marks of the node. Inline nodes can have marks.
     */
    marks?: Mark[];
    /**
     * The text content of the node. This property is only present on text nodes
     * (i.e. nodes with `type: 'text'`).
     *
     * Text nodes cannot have children, but they can have marks.
     */
    text?: string;
    [key: string]: any;
};

export type StoryblokComponnetMap<T> = {
  [key in MarkType | NodeType]: T;
}
