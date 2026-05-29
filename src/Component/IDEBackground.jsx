import React, { useState, useEffect } from 'react';

const rawCode = [
  "import React, { useState, useEffect } from 'react';",
  "",
  "const developer = {",
  "  name: 'Lee Dong Heon',",
  "  role: 'Frontend Developer',",
  "  skills: ['React', 'Next.js', 'TailwindCSS'],",
  "  passion: 'Building intuitive user interfaces',",
  "  status: 'Ready to build something great'",
  "};",
  "",
  "function buildFuture() {",
  "  return new Promise((resolve) => {",
  "    console.log('Loading modules...');",
  "    setTimeout(() => {",
  "      console.log('Success is guaranteed!');",
  "      resolve(developer);",
  "    }, 1000);",
  "  });",
  "}",
  "",
  "buildFuture().then(dev => {",
  "  console.log(`Welcome, ${dev.name}!`);",
  "});"
];

// 간단한 하이라이팅 함수
const highlight = (text) => {
  // 따옴표 문자열, 백틱 문자열, 특정 키워드들을 분리하여 하이라이팅
  const parts = text.split(/('.*?'|`.*?`|\b(?:const|function|return|new|Promise|setTimeout|console|log|import|from|then)\b|\b(?:developer|name|role|skills|passion|status|dev|React|useState|useEffect)\b)/);
  
  return parts.map((part, i) => {
    if (['const', 'function', 'return', 'new', 'import', 'from'].includes(part)) 
      return <span key={i} className="text-purple-400">{part}</span>;
    if (['Promise', 'setTimeout', 'log', 'then'].includes(part)) 
      return <span key={i} className="text-yellow-300">{part}</span>;
    if (['developer', 'console', 'React', 'useState', 'useEffect'].includes(part)) 
      return <span key={i} className="text-blue-400">{part}</span>;
    if (['name', 'role', 'skills', 'passion', 'status', 'dev'].includes(part)) 
      return <span key={i} className="text-blue-300">{part}</span>;
    if (part.startsWith("'") || part.startsWith("`")) 
      return <span key={i} className="text-green-400">{part}</span>;
    return <span key={i} className="text-gray-300">{part}</span>;
  });
};

export default function IDEBackground() {
  const [lines, setLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);

  useEffect(() => {
    if (currentLineIdx >= rawCode.length) return;

    const currentRawLine = rawCode[currentLineIdx];

    if (currentCharIdx < currentRawLine.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIdx(prev => prev + 1);
      }, Math.random() * 20 + 30); // 타이핑 속도 조절
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, currentRawLine]);
        setCurrentLineIdx(prev => prev + 1);
        setCurrentCharIdx(0);
      }, 150); // 줄바꿈 대기 시간
      return () => clearTimeout(timeout);
    }
  }, [currentLineIdx, currentCharIdx]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d1117] pointer-events-none select-none opacity-80 md:opacity-100 z-0">
      <div className="w-full h-full p-4 md:p-8 font-mono text-[10px] md:text-xs lg:text-sm leading-loose md:leading-loose">
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-8 text-right pr-4 text-gray-600 select-none">{idx + 1}</span>
            <span className="whitespace-pre">{highlight(line)}</span>
          </div>
        ))}
        
        {currentLineIdx < rawCode.length && (
          <div className="flex">
            <span className="w-8 text-right pr-4 text-gray-600 select-none">{lines.length + 1}</span>
            <span className="whitespace-pre">
              {highlight(rawCode[currentLineIdx].substring(0, currentCharIdx))}
              <span className="inline-block w-2 h-4 md:h-5 bg-lime ml-1 align-middle animate-pulse" />
            </span>
          </div>
        )}
      </div>
      
      {/* 어두운 오버레이 그라데이션으로 위쪽 컨텐츠가 잘 보이게 함 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/80 via-[#0d1117]/40 to-[#0d1117]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-transparent to-[#0d1117]" />
    </div>
  );
}
