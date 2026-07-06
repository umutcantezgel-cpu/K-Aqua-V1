const fs = require('fs');

async function test() {
  try {
    const res = await fetch('http://localhost:3001/de/referenzen');
    console.log('Status:', res.status);
    console.log('Headers:', Object.fromEntries(res.headers.entries()));
    const text = await res.text();
    fs.writeFileSync('/Users/umurey/Downloads/kaqua-antigravity 2/.agents/reviewer_step16_3/page-out.html', text);
    console.log('Saved output to page-out.html');
  } catch (err) {
    console.error('Error fetching page:', err);
  }
}

test();
