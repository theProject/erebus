/**
 * Erebus Theme Validator
 *
 * Ensures both themes meet the quality bar:
 * - All required VS Code keys are present
 * - No default blue colors in critical components
 * - Dark theme: No pure black on large surfaces
 * - Light theme: No pure white on large surfaces
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Load theme keys manifest
const themeKeysPath = resolve(__dirname, 'theme-keys.json');
const themeKeys = JSON.parse(readFileSync(themeKeysPath, 'utf-8'));

// VS Code default blue colors to check against
const DEFAULT_BLUES = [
  '#007acc',
  '#0066b8',
  '#0e639c',
  '#1177bb',
  '#3794ff',
  '#75beff'
];

/**
 * Normalize color to lowercase hex
 */
function normalizeColor(color) {
  if (!color) return null;
  return color.toLowerCase().slice(0, 7); // Strip alpha if present
}

/**
 * Check if a color is a default VS Code blue
 */
function isDefaultBlue(color) {
  const normalized = normalizeColor(color);
  return DEFAULT_BLUES.includes(normalized);
}

/**
 * Validate a single theme
 */
function validateTheme(themePath, themeType) {
  console.log(`\n🔍 Validating ${themeType} theme...`);
  console.log(`   Path: ${themePath}\n`);

  const errors = [];
  const warnings = [];

  // Check if theme file exists
  if (!existsSync(themePath)) {
    errors.push(`Theme file not found: ${themePath}`);
    return { errors, warnings };
  }

  // Load theme
  const theme = JSON.parse(readFileSync(themePath, 'utf-8'));
  const colors = theme.colors || {};

  // Check required keys
  console.log('   Checking required keys...');
  const missingKeys = [];
  for (const key of themeKeys.requiredKeys) {
    if (!(key in colors)) {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    warnings.push(`Missing ${missingKeys.length} optional keys (theme may still work)`);
    if (missingKeys.length <= 20) {
      missingKeys.forEach(key => warnings.push(`  - ${key}`));
    } else {
      missingKeys.slice(0, 10).forEach(key => warnings.push(`  - ${key}`));
      warnings.push(`  ... and ${missingKeys.length - 10} more`);
    }
  }

  // Check for default blues in critical components
  console.log('   Checking for default blue colors...');
  const criticalPatterns = themeKeys.criticalComponents.patterns;
  for (const [key, value] of Object.entries(colors)) {
    if (isDefaultBlue(value)) {
      // Check if this key matches a critical pattern
      for (const pattern of criticalPatterns) {
        const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
        if (regex.test(key)) {
          errors.push(`Default blue found in critical component: ${key} = ${value}`);
          break;
        }
      }
    }
  }

  // Theme-specific rules
  if (themeType === 'dark') {
    console.log('   Checking dark theme rules...');
    const rules = themeKeys.darkThemeRules;

    for (const key of rules.largeSurfaceKeys) {
      const value = colors[key];
      if (value && rules.forbiddenLargeSurfaceColors.includes(normalizeColor(value))) {
        errors.push(`Pure black (#000000) on large surface: ${key} = ${value}`);
      }
    }
  }

  if (themeType === 'light') {
    console.log('   Checking light theme rules...');
    const rules = themeKeys.lightThemeRules;

    for (const key of themeKeys.darkThemeRules.largeSurfaceKeys) {
      const value = colors[key];
      if (value && rules.forbiddenLargeSurfaceColors.includes(normalizeColor(value))) {
        warnings.push(`Pure white (#ffffff) on large surface: ${key} = ${value}`);
      }
    }
  }

  // Check theme metadata
  console.log('   Checking theme metadata...');
  if (!theme.name) {
    errors.push('Theme is missing "name" property');
  }
  if (!theme.type || !['dark', 'light'].includes(theme.type)) {
    errors.push('Theme is missing valid "type" property (must be "dark" or "light")');
  }
  if (theme.type !== themeType) {
    errors.push(`Theme type mismatch: expected "${themeType}", got "${theme.type}"`);
  }

  // Check tokenColors exist
  if (!theme.tokenColors || !Array.isArray(theme.tokenColors)) {
    warnings.push('Theme is missing tokenColors array');
  } else if (theme.tokenColors.length < 10) {
    warnings.push(`Theme has only ${theme.tokenColors.length} token colors (consider adding more)`);
  }

  // Summary
  const keyCount = Object.keys(colors).length;
  console.log(`\n   📊 Theme Statistics:`);
  console.log(`      - Color keys defined: ${keyCount}`);
  console.log(`      - Token colors defined: ${theme.tokenColors?.length || 0}`);
  console.log(`      - Semantic highlighting: ${theme.semanticHighlighting ? 'enabled' : 'disabled'}`);

  return { errors, warnings };
}

/**
 * Main validation function
 */
async function validate() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('              EREBUS THEME VALIDATOR');
  console.log('   "The guardian of depth and restraint"');
  console.log('═══════════════════════════════════════════════════════════');

  const themes = [
    { path: resolve(rootDir, 'dist/Erebus Dark-color-theme.json'), type: 'dark' },
    { path: resolve(rootDir, 'dist/Erebus Light-color-theme.json'), type: 'light' }
  ];

  let hasErrors = false;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const { path, type } of themes) {
    const { errors, warnings } = validateTheme(path, type);

    totalErrors += errors.length;
    totalWarnings += warnings.length;

    if (errors.length > 0) {
      hasErrors = true;
      console.log(`\n   ❌ ERRORS (${errors.length}):`);
      errors.forEach(err => console.log(`      ${err}`));
    }

    if (warnings.length > 0) {
      console.log(`\n   ⚠️  WARNINGS (${warnings.length}):`);
      warnings.forEach(warn => console.log(`      ${warn}`));
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`\n   ✅ All checks passed!`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');

  if (hasErrors) {
    console.log(`   ❌ VALIDATION FAILED`);
    console.log(`      Errors: ${totalErrors}, Warnings: ${totalWarnings}`);
    console.log('═══════════════════════════════════════════════════════════\n');
    process.exit(1);
  } else {
    console.log(`   ✨ VALIDATION PASSED`);
    if (totalWarnings > 0) {
      console.log(`      Warnings: ${totalWarnings} (non-blocking)`);
    }
    console.log('═══════════════════════════════════════════════════════════\n');
  }
}

// Run validation
validate();
