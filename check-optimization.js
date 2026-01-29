/**
 * Diagnostic script to check if all optimizations are in place
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Performance Optimizations...\n');

const checks = {
    passed: [],
    failed: [],
    warnings: []
};

// Check 1: WebP images exist
console.log('1️⃣  Checking WebP images...');
const webpImages = ['hero.webp', 'sample1.webp', 'sample2.webp'];
webpImages.forEach(img => {
    const imgPath = path.join(__dirname, 'frontend', 'assets', img);
    if (fs.existsSync(imgPath)) {
        const stats = fs.statSync(imgPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        checks.passed.push(`✅ ${img} exists (${sizeKB} KB)`);
    } else {
        checks.failed.push(`❌ ${img} NOT FOUND`);
    }
});

// Check 2: Critical CSS exists
console.log('\n2️⃣  Checking Critical CSS...');
const criticalCssPath = path.join(__dirname, 'frontend', 'css', 'critical.css');
if (fs.existsSync(criticalCssPath)) {
    const stats = fs.statSync(criticalCssPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    checks.passed.push(`✅ critical.css exists (${sizeKB} KB)`);
    if (stats.size > 14000) {
        checks.warnings.push(`⚠️  critical.css is large (${sizeKB} KB). Should be < 14KB for inline.`);
    }
} else {
    checks.failed.push(`❌ critical.css NOT FOUND`);
}

// Check 3: Minified JS exists
console.log('\n3️⃣  Checking Minified JavaScript...');
const minJsPath = path.join(__dirname, 'frontend', 'js', 'main.min.js');
if (fs.existsSync(minJsPath)) {
    const stats = fs.statSync(minJsPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    checks.passed.push(`✅ main.min.js exists (${sizeKB} KB)`);
} else {
    checks.failed.push(`❌ main.min.js NOT FOUND`);
}

// Check 4: HTML uses WebP
console.log('\n4️⃣  Checking HTML for WebP references...');
const htmlPath = path.join(__dirname, 'frontend', 'index.html');
if (fs.existsSync(htmlPath)) {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    if (htmlContent.includes('hero.webp')) {
        checks.passed.push(`✅ HTML references hero.webp`);
    } else {
        checks.failed.push(`❌ HTML does NOT reference hero.webp`);
    }
    
    if (htmlContent.includes('<picture>')) {
        checks.passed.push(`✅ HTML uses <picture> elements`);
    } else {
        checks.failed.push(`❌ HTML does NOT use <picture> elements`);
    }
    
    if (htmlContent.includes('critical.css')) {
        checks.passed.push(`✅ HTML loads critical.css (external)`);
    } else if (htmlContent.includes('<style>') && htmlContent.includes('hero__headline')) {
        checks.passed.push(`✅ HTML has inlined critical CSS (best practice)`);
    } else {
        checks.failed.push(`❌ HTML does NOT have critical CSS`);
    }
    
    if (htmlContent.includes('main.min.js')) {
        checks.passed.push(`✅ HTML uses main.min.js`);
    } else {
        checks.warnings.push(`⚠️  HTML uses main.js instead of main.min.js`);
    }
    
    if (htmlContent.includes('onload="this.onload=null;this.rel=\'stylesheet\'"')) {
        checks.passed.push(`✅ HTML defers non-critical CSS`);
    } else {
        checks.warnings.push(`⚠️  Non-critical CSS might not be deferred`);
    }
}

// Check 5: Server configuration
console.log('\n5️⃣  Checking Server Configuration...');
const htaccessPath = path.join(__dirname, 'frontend', '.htaccess');
if (fs.existsSync(htaccessPath)) {
    checks.passed.push(`✅ .htaccess exists (Apache config)`);
} else {
    checks.warnings.push(`⚠️  .htaccess NOT FOUND (needed for Apache)`);
}

const nginxPath = path.join(__dirname, 'nginx-performance.conf');
if (fs.existsSync(nginxPath)) {
    checks.passed.push(`✅ nginx-performance.conf exists`);
} else {
    checks.warnings.push(`⚠️  nginx-performance.conf NOT FOUND`);
}

// Print Results
console.log('\n' + '='.repeat(60));
console.log('📊 OPTIMIZATION CHECK RESULTS');
console.log('='.repeat(60) + '\n');

if (checks.passed.length > 0) {
    console.log('✅ PASSED CHECKS:');
    checks.passed.forEach(check => console.log('   ' + check));
    console.log('');
}

if (checks.warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    checks.warnings.forEach(check => console.log('   ' + check));
    console.log('');
}

if (checks.failed.length > 0) {
    console.log('❌ FAILED CHECKS:');
    checks.failed.forEach(check => console.log('   ' + check));
    console.log('');
}

// Summary
console.log('='.repeat(60));
console.log(`Total: ${checks.passed.length} passed, ${checks.warnings.length} warnings, ${checks.failed.length} failed`);
console.log('='.repeat(60) + '\n');

if (checks.failed.length === 0 && checks.warnings.length === 0) {
    console.log('🎉 All optimizations are in place!');
    console.log('📊 Expected Lighthouse Performance: 90+/100\n');
} else if (checks.failed.length > 0) {
    console.log('❌ Some critical optimizations are missing!');
    console.log('🔧 Please fix the failed checks above.\n');
} else {
    console.log('⚠️  Optimizations are mostly in place, but check warnings.');
    console.log('📊 Expected Lighthouse Performance: 85-90/100\n');
}

// Additional tips
console.log('💡 TIPS FOR BETTER PERFORMANCE:');
console.log('   1. Clear browser cache before testing');
console.log('   2. Test in Incognito mode');
console.log('   3. Ensure server caching is configured');
console.log('   4. Check Network tab for actual file sizes loaded');
console.log('   5. Run: npm run lighthouse\n');
