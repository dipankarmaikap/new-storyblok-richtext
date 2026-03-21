import { RichTextComponentProps } from "@/lib/richtext-renderer";

type Props = RichTextComponentProps<"blok">;

export default function BlokResolver({ attrs }: Props) {
  const body = attrs?.body ?? 1;

  return (
    <pre className="bg-gray-50 whitespace-pre-wrap max-h-50 overflow-scroll">
      {JSON.stringify(body, null, 2)}
    </pre>
  );
}
