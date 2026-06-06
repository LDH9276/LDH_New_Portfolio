import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const languageExtensions = {
  css: 'css',
  html: 'html',
  javascript: 'js',
  jsx: 'jsx',
  php: 'php',
  sql: 'sql',
};

const getCommonIndent = (lines) => {
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length || 0);

  return indents.length > 0 ? Math.min(...indents) : 0;
};

const normalizeSpacing = (line) => line
  .replace(/\s+$/g, '')
  .replace(/\s*{\s*$/g, ' {')
  .replace(/\}\s*else\s*\{/g, '} else {')
  .replace(/\b(if|for|while|switch|function|catch)\s*\(/g, '$1 (')
  .replace(/\s*;\s*$/g, ';')
  .replace(/\s+\)/g, ')');

const formatCode = (value) => {
  const source = String(value || '')
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, '  ');
  const rawLines = source.split('\n');
  const commonIndent = getCommonIndent(rawLines);
  const lines = rawLines
    .map((line) => line.slice(commonIndent))
    .map(normalizeSpacing);

  return lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

function PortfolioCodeBlock({ code, language = 'javascript', fileName = 'portfolio-snippet' }) {
  const hasCode = typeof code === 'string' && code.trim().length > 0;
  const codeLanguage = language || 'javascript';
  const extension = languageExtensions[codeLanguage] || 'js';
  const displayCode = hasCode ? formatCode(code) : '// 코드는 추후 추가 예정입니다.';

  return (
    <figure className="card overflow-hidden border-none bg-[#1e1e1e]">
      <figcaption className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-mono text-white/50">
          {fileName}.{extension}
        </span>
      </figcaption>
      <SyntaxHighlighter
        language={codeLanguage}
        style={vscDarkPlus}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          minHeight: '320px',
          maxHeight: '520px',
          padding: '24px',
          background: '#1e1e1e',
          fontSize: '12px',
          lineHeight: '1.75',
        }}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: 'rgba(255,255,255,0.25)',
          textAlign: 'right',
        }}
        codeTagProps={{
          className: 'font-mono',
        }}
      >
        {displayCode}
      </SyntaxHighlighter>
    </figure>
  );
}

export default PortfolioCodeBlock;
