import fs from 'fs';
import path from 'path';

const nodeModulesPath = './node_modules';
const lightningcssPath = path.join(nodeModulesPath, 'lightningcss');
const binaryPath = path.join(lightningcssPath, 'lightningcss.linux-x64-gnu.node');
const targetPath = path.join(nodeModulesPath, 'lightningcss-linux-x64-gnu', 'lightningcss.linux-x64-gnu.node');

try {
  // Remove existing symlink if it exists
  if (fs.existsSync(binaryPath)) {
    const stat = fs.lstatSync(binaryPath);
    if (stat.isSymbolicLink() || stat.isFile()) {
      fs.unlinkSync(binaryPath);
    }
  }

  // Create symlink
  if (fs.existsSync(targetPath)) {
    fs.symlinkSync('../lightningcss-linux-x64-gnu/lightningcss.linux-x64-gnu.node', binaryPath);
    console.log('✓ lightningcss binary symlink created');
  }
} catch (err) {
  console.warn('⚠ Could not create lightningcss symlink:', err.message);
}
