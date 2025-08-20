export const LANGUAGE_DATA = [
  {
    language: 'c',
    version: '10.2.0',
    codeSnippet: `#include <stdio.h>\n\nint main() {\n\tprintf("Welcome to codeCatalyst");\n\treturn 0;\n}\n`,
    info: 'C does not have built-in Tree Set or Tree Map data structures, but you can use structures to build it.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    extension: 'c', // File extension for C
  },
  {
    language: 'cpp',
    version: '10.2.0',
    codeSnippet: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout << "Welcome to codeCatalyst" << endl;\n\treturn 0;\n}\n`,
    info: 'C++ does not have built-in Tree Set or Tree Map data structures, but you can use `std::set` and `std::map` from the Standard Template Library (STL).',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    extension: 'cpp', // File extension for C++
  },
  {
    language: 'java',
    version: '15.0.2',
    codeSnippet: `import java.util.*;\nimport java.io.*;\n\npublic class Welcome {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Welcome to codeCatalyst");\n\t}\n}\n`,
    info: 'Java provides built-in Tree Set and Tree Map data structures in the `java.util` package, which are part of the Java Collections Framework.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    extension: 'java', // File extension for Java
  },
  {
    language: 'javascript',
    version: '18.15.0',
    codeSnippet: `function welcome() {\n\tconsole.log("Welcome to codeCatalyst");\n}\n\nwelcome();\n`,
    info: 'JavaScript does not have built-in Queue and Priority Queue data structures so you may use datastructures-js/queue and datastructures-js/priority-queue instead.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    extension: 'js', // File extension for JavaScript
  },
  {
    language: 'typescript',
    version: '5.0.3',
    codeSnippet: `type Params = {\n\tmessage: string;\n}\n\nfunction welcome(data: Params) {\n\tconsole.log(data.message);\n}\n\nwelcome({ message: "Welcome to codeCatalyst" });\n`,
    info: 'TypeScript does not have built-in Queue and Priority Queue data structures so you may use datastructures-js/queue and datastructures-js/priority-queue instead.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    extension: 'ts', // File extension for TypeScript
  },
  {
    language: 'python',
    version: '3.10.0',
    codeSnippet: `def welcome():\n\tprint("Welcome to codeCatalyst")\n\nwelcome()\n`,
    info: 'Python does not have built-in Tree Set or Tree Map data structures, so you may use `sortedcontainers` for sorted data structures.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    extension: 'py', // File extension for Python
  },
  {
    language: 'go',
    version: '1.16.2',
    codeSnippet: `package main\nimport "fmt"\n\nfunc welcome() {\n\tfmt.Println("Welcome to codeCatalyst")\n}\n\nfunc main() {\n\twelcome()\n}\n`,
    info: 'Go (1.16.2)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
    extension: 'go', // File extension for Go
  },
  {
    language: 'csharp',
    version: '6.12.0',
    codeSnippet: `using System;\nusing System.Collections.Generic;\n\nnamespace CodeEditor\n{\n\tclass Welcome {\n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Welcome to codeCatalyst");\n\t\t}\n\t}\n}\n`,
    info: 'C# provides `SortedSet<T>` and `SortedDictionary<TKey, TValue>` in the `System.Collections.Generic` namespace for sorted data structures.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    extension: 'cs', // File extension for C#
  },
  {
    language: 'kotlin',
    version: '1.8.20',
    codeSnippet: `import java.util.*;\n\nfun welcome() {\n\tprintln("Welcome to codeCatalyst")\n}\n\nfun main() {\n\twelcome()\n}\n`,
    info: 'Kotlin (1.8.20)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    extension: 'kt', // File extension for Kotlin
  },
  {
    language: 'perl',
    version: '5.36.0',
    codeSnippet: `use List::Util qw(shuffle);\n\nsub welcome {\n\tprint "Welcome to codeCatalyst\\n";\n}\n\nwelcome();\n`,
    info: 'Perl (5.36.0)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg',
    extension: 'pl', // File extension for Perl
  },
  {
    language: 'php',
    version: '8.2.3',
    codeSnippet: `<?php\n\necho "Welcome to codeCatalyst";\n`,
    info: 'PHP (8.2.3)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    extension: 'php', // File extension for PHP
  },
  {
    language: 'ruby',
    version: '3.0.1',
    codeSnippet: `def welcome\n\tputs "Welcome to codeCatalyst"\nend\n\nwelcome()\n`,
    info: 'Ruby (3.0.1)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg',
    extension: 'rb', // File extension for Ruby
  },
  {
    language: 'rust',
    version: '1.68.2',
    codeSnippet: `fn welcome() {\n\tprintln!("Welcome to codeCatalyst");\n}\n\nfn main() {\n\twelcome();\n}\n`,
    info: 'Rust (1.68.2)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
    extension: 'rs', // File extension for Rust
  },
  {
    language: 'swift',
    version: '5.3.3',
    codeSnippet: `import Foundation\n\nfunc welcome() {\n\tprint("Welcome to codeCatalyst")\n}\n\nwelcome()\n`,
    info: 'Swift (5.3.3)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg',
    extension: 'swift', // File extension for Swift
  },
  {
    language: 'bash',
    version: '5.2.0',
    codeSnippet: `#!/bin/bash\n\necho "Welcome to codeCatalyst"\n`,
    info: 'Bash (5.2.0)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
    extension: 'sh', // File extension for Bash
  },
];
