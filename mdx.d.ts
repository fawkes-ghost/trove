// Legal documents are MDX files in content/legal, imported as components by their pages.
declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types';
  export default function MDXContent(props: MDXProps): React.JSX.Element;
}
