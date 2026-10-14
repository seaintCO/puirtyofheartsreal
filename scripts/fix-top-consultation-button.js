const fs = require("fs");
const path = "src/app/page.tsx";

let text = fs.readFileSync(path, "utf8");

text = text.replace(
  /className="([^"]*Book Consultation[^"]*)"/g,
  'className="$1"'
);

// Find top Book Consultation button/link and force View Portfolio style sizing/design on mobile
text = text.replace(
  /className="([^"]*)"\s*>\s*Book Consultation/g,
  'className="inline-flex items-center gap-3 rounded-full bg-[#080b12] px-5 py-3 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:px-6 sm:py-4 sm:text-base" >Book Consultation'
);

// Remove lower duplicate Book Consultation button in hero
let seen = 0;
text = text.replace(/<(a|button)([^>]*)>\s*Book Consultation\s*([^<]*)<\/\1>/g, (match) => {
  seen++;
  return seen === 1 ? match : "";
});

fs.writeFileSync(path, text, "utf8");
