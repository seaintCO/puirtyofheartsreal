const fs = require("fs");
const file = "src/app/page.tsx";

let text = fs.readFileSync(file, "utf8");

text = text.replace(
  /Building a\{?"\s*"\}?[\s\S]*?quarter billion[\s\S]*?ecosystem\./,
  `Build{" "}
            <span className="ecosystem-text">Tomorrow,</span>{" "}
            Today.`
);

text = text.replace(
  /Capital, technology, strategy, and execution[\s\S]*?scaling companies\./,
  "Building the next generation of companies through capital, technology, and execution."
);

text = text.replace(/#c8b273/g, "#2563eb");
text = text.replace(/#8f7d45/g, "#2563eb");
text = text.replace(/rgba\(200,178,115/g, "rgba(37,99,235");

text = text.replace(/SEAINT Enterprise/g, "");

text = text.replace(
  /text-5xl font-semibold tracking-\[-0\.08em\] sm:text-7xl lg:text-8xl/g,
  "text-5xl font-semibold leading-[0.92] tracking-[-0.08em] sm:text-7xl lg:text-8xl"
);

text = text.replace(
  /<h1 className="mx-auto max-w-6xl[^"]*">/,
  '<h1 className="mx-auto max-w-6xl text-5xl font-semibold leading-[0.92] tracking-[-0.08em] sm:text-7xl lg:text-8xl">'
);

fs.writeFileSync(file, text, "utf8");
