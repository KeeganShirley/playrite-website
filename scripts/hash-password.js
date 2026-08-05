const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.js <new-password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

// Escaped for direct paste into .env - Next's env loader interpolates
// bare "$" as a variable reference and will corrupt an unescaped hash.
console.log('ADMIN_PASSWORD_HASH="' + hash.replace(/\$/g, "\\$") + '"');
