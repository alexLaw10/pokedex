const fs = require('fs');
const path = require('path');

function removeComments(content) {
  // Remove comentários de bloco /* */
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remove comentários de linha // (mas não URLs)
  content = content.replace(/\/\/(?![\/\s]*https?:\/\/).*$/gm, '');
  
  // Remove linhas vazias extras
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = removeComments(content);
    fs.writeFileSync(filePath, newContent);
    console.log(`Processed: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      processFile(filePath);
    }
  });
}

// Processar src/
processDirectory('./src');
console.log('All comments removed!');
