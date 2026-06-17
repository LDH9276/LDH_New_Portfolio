import React, { useState, useEffect } from 'react';

const rawCode = [
  "import React, { useState, useEffect, useCallback } from 'react';",
  "import { motion, AnimatePresence } from 'framer-motion';",
  "",
  "/**",
  " * Frontend Developer Portfolio Configuration",
  " * @author Lee Dong Heon",
  " */",
  "const developerProfile = {",
  "  name: 'Lee Dong Heon',",
  "  role: 'Frontend Developer',",
  "  experience: '2+ Years',",
  "  coreSkills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],",
  "  backendSkills: ['Node.js', 'PHP', 'MySQL'],",
  "  tools: ['Git', 'Figma', 'Webpack', 'Vite'],",
  "  passion: 'Building intuitive user interfaces',",
  "  philosophy: 'Code is read more often than it is written.',",
  "  status: 'Ready to build something great'",
  "};",
  "",
  "class PortfolioEngine {",
  "  constructor(profile) {",
  "    this.profile = profile;",
  "    this.isLoaded = false;",
  "    this.modules = new Map();",
  "  }",
  "",
  "  async initializeSystem() {",
  "    console.log('Booting up portfolio engine...');",
  "    try {",
  "      await this.loadCoreModules();",
  "      this.isLoaded = true;",
  "      return this.renderUI();",
  "    } catch (error) {",
  "      console.error('Initialization failed:', error);",
  "    }",
  "  }",
  "",
  "  loadCoreModules() {",
  "    return new Promise((resolve) => {",
  "      setTimeout(() => {",
  "        this.profile.coreSkills.forEach(skill => {",
  "          this.modules.set(skill, { status: 'optimized' });",
  "        });",
  "        console.log('All core skills successfully loaded.');",
  "        resolve(true);",
  "      }, 1500);",
  "    });",
  "  }",
  "}",
  "",
  "const engine = new PortfolioEngine(developerProfile);",
  "engine.initializeSystem().then(() => {",
  "  console.log(`Welcome, ${developerProfile.name}!`);",
  "});"
];

// 간단한 하이라이팅 함수
const highlight = (text) => {
  const parts = text.split(/('.*?'|`.*?`|\b(?:const|function|return|new|Promise|setTimeout|console|log|import|from|then|class|constructor|this|async|await|try|catch|export|default|if|else|true|false|error)\b|\b(?:developerProfile|name|role|coreSkills|backendSkills|tools|passion|philosophy|status|dev|React|useState|useEffect|useCallback|PortfolioEngine|engine|profile|modules)\b|\/\*[\s\S]*?\*\/|\/\/.*)/);
  
  return parts.map((part, i) => {
    if (['const', 'function', 'return', 'new', 'import', 'from', 'class', 'constructor', 'this', 'async', 'await', 'try', 'catch', 'export', 'default', 'if', 'else'].includes(part)) 
      return <span key={i} className="text-purple-700 font-medium dark:font-normal dark:text-purple-400">{part}</span>;
    if (['Promise', 'setTimeout', 'log', 'then', 'error', 'console'].includes(part)) 
      return <span key={i} className="text-amber-700 font-medium dark:font-normal dark:text-yellow-300">{part}</span>;
    if (['developerProfile', 'React', 'useState', 'useEffect', 'useCallback', 'PortfolioEngine', 'engine'].includes(part)) 
      return <span key={i} className="text-blue-700 font-medium dark:font-normal dark:text-blue-400">{part}</span>;
    if (['name', 'role', 'coreSkills', 'backendSkills', 'tools', 'passion', 'philosophy', 'status', 'profile', 'modules', 'true', 'false'].includes(part)) 
      return <span key={i} className="text-teal-700 font-medium dark:font-normal dark:text-blue-300">{part}</span>;
    if (part.startsWith("'") || part.startsWith("`")) 
      return <span key={i} className="text-green-700 font-medium dark:font-normal dark:text-green-400">{part}</span>;
    if (part.startsWith("/*") || part.startsWith("//") || part.startsWith(" *")) 
      return <span key={i} className="text-gray-400 italic">{part}</span>;
    return <span key={i} className="text-gray-800 dark:text-gray-300 font-medium dark:font-normal">{part}</span>;
  });
};

export default function IDEBackground({ contentClassName = "" }) {
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
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-surface-light dark:bg-[#0d1117] transition-colors duration-500 pointer-events-none select-none opacity-100 z-0"
    >
      <div className={`w-full h-full p-4 md:p-8 font-mono text-[10px] md:text-xs lg:text-sm leading-loose md:leading-loose opacity-50 dark:opacity-80 lg:opacity-70 lg:dark:opacity-100 ${contentClassName}`}>
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-8 text-right pr-4 text-gray-400 dark:text-gray-600 select-none">{idx + 1}</span>
            <span className="whitespace-pre">{highlight(line)}</span>
          </div>
        ))}
        
        {currentLineIdx < rawCode.length && (
          <div className="flex">
            <span className="w-8 text-right pr-4 text-gray-400 dark:text-gray-600 select-none">{lines.length + 1}</span>
            <span className="whitespace-pre">
              {highlight(rawCode[currentLineIdx].substring(0, currentCharIdx))}
              <span className="inline-block w-2 h-4 md:h-5 bg-lime ml-1 align-middle animate-pulse" />
            </span>
          </div>
        )}
      </div>
      
      {/* 어두운 오버레이 그라데이션으로 위쪽 컨텐츠가 잘 보이게 함 */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-light/40 via-surface-light/10 to-surface-light/60 dark:from-[#0d1117]/80 dark:via-[#0d1117]/40 dark:to-[#0d1117]/90 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-light/60 via-transparent to-surface-light/60 dark:from-[#0d1117] dark:via-transparent dark:to-[#0d1117] transition-colors duration-500" />
    </div>
  );
}
