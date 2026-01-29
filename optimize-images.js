/**
 * Image Optimization Script
 * Converts PNG images to WebP format for better performance
 * 
 * Usage: node optimize-images.js
 * 
 * Requirements: Install sharp library
 * npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'frontend', 'assets');
const images = ['hero.png', 'sample1.png', 'sample2.png'];

async function optimizeImages() {
    console.log('🖼️  Starting image optimization...\n');
    
    for (const image of images) {
        const inputPath = path.join(assetsDir, image);
        const outputPath = path.join(assetsDir, image.replace('.png', '.webp'));
        
        try {
            const inputStats = fs.statSync(inputPath);
            const inputSizeKB = (inputStats.size / 1024).toFixed(2);
            
            // Convert to WebP with quality 85 (good balance between size and quality)
            await sharp(inputPath)
                .webp({ quality: 85, effort: 6 })
                .toFile(outputPath);
            
            const outputStats = fs.statSync(outputPath);
            const outputSizeKB = (outputStats.size / 1024).toFixed(2);
            const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
            
            console.log(`✅ ${image}`);
            console.log(`   Original: ${inputSizeKB} KB`);
            console.log(`   WebP: ${outputSizeKB} KB`);
            console.log(`   Savings: ${savings}%\n`);
            
        } catch (error) {
            console.error(`❌ Error processing ${image}:`, error.message);
        }
    }
    
    console.log('✨ Image optimization complete!');
    console.log('\n📊 Expected Performance Improvements:');
    console.log('   • LCP (Largest Contentful Paint): -30-40%');
    console.log('   • Total Page Weight: -40-60%');
    console.log('   • Network Transfer Time: -40-60%');
}

// Check if sharp is installed
try {
    require.resolve('sharp');
    optimizeImages();
} catch (e) {
    console.error('❌ Error: sharp library not found');
    console.log('\n📦 Please install sharp first:');
    console.log('   npm install sharp --save-dev');
    console.log('\nThen run this script again:');
    console.log('   node optimize-images.js');
}
