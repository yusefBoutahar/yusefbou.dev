// CV PDF Generation Script for Astro Projects
// This script generates PDF versions of your CV from HTML templates using Puppeteer

import fs from 'fs';
import path from 'path';

console.log('CV PDF Generation Script');
console.log('========================');

// Check if Puppeteer is installed
let puppeteer;
try {
  puppeteer = await import('puppeteer');
  console.log('✓ Puppeteer is available');
} catch (error) {
  console.log('✗ Puppeteer not found. Please install it with:');
  console.log('  npm install puppeteer');
  console.log('');
  console.log('After installing Puppeteer, run this script again.');
  process.exit(1);
}

// Function to convert HTML to PDF
async function convertHTMLToPDF(htmlFile, pdfFile) {
  try {
    const browser = await puppeteer.default.launch();
    const page = await browser.newPage();
    
    // Read the HTML file content
    const htmlContent = fs.readFileSync(htmlFile, 'utf8');
    
    // Set the HTML content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF with A4 size and 14mm margins
    await page.pdf({
      path: pdfFile,
      format: 'A4',
      margin: {
        top: '14mm',
        bottom: '14mm',
        left: '14mm',
        right: '14mm'
      },
      printBackground: true
    });
    
    await browser.close();
    console.log(`✓ Successfully created: ${path.basename(pdfFile)}`);
  } catch (error) {
    console.error(`✗ Error converting ${path.basename(htmlFile)} to PDF:`, error.message);
  }
}

// Main execution
async function main() {
  const htmlDir = path.join('scripts', 'cv', '.build');
  const pdfDir = path.join('scripts', 'cv', '.build');
  
  // Check if HTML files exist
  const englishHtml = path.join(htmlDir, 'cv-en.html');
  const spanishHtml = path.join(htmlDir, 'cv-es.html');
  
  if (!fs.existsSync(englishHtml)) {
    console.error('✗ English HTML file not found:', englishHtml);
    process.exit(1);
  }
  
  if (!fs.existsSync(spanishHtml)) {
    console.error('✗ Spanish HTML file not found:', spanishHtml);
    process.exit(1);
  }
  
  console.log('Converting CV HTML templates to PDF...');
  
  // Convert English CV
  const englishPdf = path.join(pdfDir, 'cv-en.pdf');
  await convertHTMLToPDF(englishHtml, englishPdf);
  
  // Convert Spanish CV
  const spanishPdf = path.join(pdfDir, 'cv-es.pdf');
  await convertHTMLToPDF(spanishHtml, spanishPdf);
  
  console.log('');
  console.log('PDF generation process completed successfully!');
  console.log('Both PDF files have been updated in the scripts/cv/.build/ directory.');
}

// Run the script
main().catch(console.error);