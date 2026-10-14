const fs = require("fs");

const pagePath = "src/app/page.tsx";
let text = fs.readFileSync(pagePath, "utf8");

// remove Menu import/use
text = text.replace(/,\s*Menu/g, "");
text = text.replace(/Menu,\s*/g, "");
text = text.replace(/<button[^>]*md:hidden[^>]*>[\s\S]*?<\/button>/g, "");
text = text.replace(/<Menu[^>]*\/>/g, "");

// remove duplicate hero Book Consultation buttons, keep top nav one
let count = 0;
text = text.replace(/<(a|button)([^>]*)>([\s\S]*?Book Consultation[\s\S]*?)<\/\1>/g, (match) => {
  count++;
  if (count === 1) {
    return match
      .replace(/px-5 py-3/g, "px-3 py-2 sm:px-5 sm:py-3")
      .replace(/px-6 py-3/g, "px-3 py-2 sm:px-6 sm:py-3")
      .replace(/text-sm/g, "text-xs sm:text-sm");
  }
  return "";
});

// remove duplicate SEAINT Enterprise badge/pill, keep main logo/header
text = text.replace(/<div[^>]*>\s*(<[^>]+>\s*)*SEAINT\s+Enterprise\s*(<\/[^>]+>\s*)*<\/div>/gi, "");
text = text.replace(/<p[^>]*>\s*SEAINT\s+Enterprise\s*<\/p>/gi, "");
text = text.replace(/<span[^>]*>\s*SEAINT\s+Enterprise\s*<\/span>/gi, "");

// add flash animation class to Zap icons
text = text.replace(/<Zap([^>]*)className="([^"]*)"/g, '<Zap$1className="seaint-flash $2"');

// add footer legal links if missing
if (!text.includes('/privacy') && text.includes('</footer>')) {
  text = text.replace(
    '</footer>',
    `<div className="mt-8 flex justify-center gap-6 text-xs text-neutral-500">
        <a href="/privacy" className="hover:text-black">Privacy Policy</a>
        <a href="/terms" className="hover:text-black">Terms of Service</a>
      </div>
    </footer>`
  );
}

fs.writeFileSync(pagePath, text, "utf8");
