const fs = require("fs");
const file = "src/app/page.tsx";
let text = fs.readFileSync(file, "utf8");

// Make the FIRST Book Consultation button smaller on mobile.
// Keeps desktop larger.
let count = 0;
text = text.replace(/<(a|button)([^>]*)>\s*Book Consultation\s*([\s\S]*?)<\/\1>/g, (match, tag, attrs, rest) => {
  count++;

  if (count === 1) {
    const newAttrs = attrs.replace(
      /className="[^"]*"/,
      'className="inline-flex items-center justify-center gap-2 rounded-full bg-[#080b12] px-4 py-2 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:px-6 sm:py-3 sm:text-base"'
    );

    return `<${tag}${newAttrs}>Book Consultation ${rest}</${tag}>`;
  }

  // Remove duplicate lower Book Consultation button
  return "";
});

fs.writeFileSync(file, text, "utf8");
