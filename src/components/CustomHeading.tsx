import type { RichTextComponentProps } from '../lib/richtext-renderer';
import RichTextNode from '../lib/richtext-renderer/react/RichTextNode';
type Props = RichTextComponentProps<'heading'>;

export default function CustomHeading({attrs,content,components}: Props) {
  return (
    <div>
     {content?.map((child ,idx) => <RichTextNode key={idx} node={child} components={components} />)}
    </div>
  )
}
