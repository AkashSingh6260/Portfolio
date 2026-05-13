const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // Build frontend
  console.log('Installing dependencies...');
  execSync('npm install --prefix frontend', { stdio: 'inherit' });
  
  console.log('Building frontend...');
  execSync('npm run build --prefix frontend', { stdio: 'inherit' });

  // Copy dist to root
  const srcDir = path.join(process.cwd(), 'frontend', 'dist');
  const destDir = path.join(process.cwd(), 'dist');

  console.log(`\nCopying from: ${srcDir}`);
  console.log(`Copying to: ${destDir}`);

  // Verify source exists
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Source directory not found: ${srcDir}`);
  }

  // Remove existing dist if it exists
  if (fs.existsSync(destDir)) {
    console.log('Removing existing dist directory...');
    fs.rmSync(destDir, { recursive: true, force: true });
  }

  // Copy the directory
  console.log('Copying files...');
  fs.cpSync(srcDir, destDir, { recursive: true });

  console.log('✓ Build completed successfully!');
  console.log(`Output directory ready at: ${destDir}`);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
