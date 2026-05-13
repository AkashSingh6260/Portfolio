const fs = require('fs');
const path = require('path');

// Build frontend
console.log('Building frontend...');
require('child_process').execSync('npm --prefix frontend install && npm --prefix frontend run build', { stdio: 'inherit' });

// Copy dist to root
const srcDir = path.join(__dirname, 'frontend', 'dist');
const destDir = path.join(__dirname, 'dist');

console.log(`Copying ${srcDir} to ${destDir}...`);

// Remove existing dist if it exists
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}

// Copy the directory
fs.cpSync(srcDir, destDir, { recursive: true });

console.log('Build completed successfully!');
