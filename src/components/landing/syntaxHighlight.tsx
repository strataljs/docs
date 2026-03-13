const KEYWORDS = new Set([
  'import', 'export', 'default', 'new', 'async', 'await', 'const', 'let', 'var',
  'if', 'else', 'switch', 'case', 'break', 'return', 'class', 'from', 'function',
]);

type Token = { type: 'keyword' | 'string' | 'comment' | 'decorator' | 'type' | 'punctuation' | 'plain'; value: string };

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Comments
    if (code[i] === '/' && code[i + 1] === '/') {
      const end = code.indexOf('\n', i);
      const value = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ type: 'comment', value });
      i += value.length;
      continue;
    }

    // Strings (single/double quotes, backticks)
    if (code[i] === "'" || code[i] === '"' || code[i] === '`') {
      const quote = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== quote) {
        if (code[j] === '\\') j++;
        j++;
      }
      tokens.push({ type: 'string', value: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Decorators
    if (code[i] === '@' && /[A-Z]/.test(code[i + 1] || '')) {
      let j = i + 1;
      while (j < code.length && /\w/.test(code[j])) j++;
      tokens.push({ type: 'decorator', value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Words (keywords, types, identifiers)
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /\w/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ type: 'type', value: word });
      } else {
        tokens.push({ type: 'plain', value: word });
      }
      i = j;
      continue;
    }

    // Punctuation
    if (/[{}()\[\];:.,=<>!&|?+\-*/%]/.test(code[i])) {
      tokens.push({ type: 'punctuation', value: code[i] });
      i++;
      continue;
    }

    // Whitespace and other characters
    let j = i;
    while (j < code.length && !/[a-zA-Z_$@'"`/{}()\[\];:.,=<>!&|?+\-*/%]/.test(code[j])) j++;
    tokens.push({ type: 'plain', value: code.slice(i, j) });
    i = j;
  }

  return tokens;
}

const CLASS_MAP: Record<string, string> = {
  keyword: 'sl-syntax-keyword',
  string: 'sl-syntax-string',
  comment: 'sl-syntax-comment',
  decorator: 'sl-syntax-decorator',
  type: 'sl-syntax-type',
  punctuation: 'sl-syntax-punctuation',
};

export function highlightTS(code: string): JSX.Element[] {
  return tokenize(code).map((token, i) => {
    const cls = CLASS_MAP[token.type];
    return cls ? <span key={i} className={cls}>{token.value}</span> : <span key={i}>{token.value}</span>;
  });
}
