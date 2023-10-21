import { Marked } from 'marked'
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import katex from 'katex';
import 'katex/dist/katex.min.css';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

type LatexType = 'inline' | 'block';
function latexToHTML(latex: string, inline: LatexType) {
  return katex.renderToString(latex, {
    throwOnError: false,
    output: 'html',
    displayMode: inline === 'block',
  });
}

export function renderToHTML(text: string) {
  const markdown = text
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, expr) => latexToHTML(expr, 'block'))
    .replace(/\$([\s\S]*?)\$/g, (_, expr) => latexToHTML(expr, 'inline'))
  return marked.parse(markdown) as string;
}