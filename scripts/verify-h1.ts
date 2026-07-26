import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT_DIR = process.cwd();
const APP_LOCALE_DIR = path.join(ROOT_DIR, 'app', '[locale]');

interface PageRouteResult {
  route: string;
  filePath: string;
  h1Count: number;
  h1Locations: string[];
  status: 'PASS' | 'FAIL';
}

/**
 * Resolves an import module path to an absolute file path on disk.
 */
function resolveImportPath(importPath: string, containingFile: string): string | null {
  let targetPath: string;

  if (importPath.startsWith('@/')) {
    targetPath = path.join(ROOT_DIR, importPath.slice(2));
  } else if (importPath.startsWith('.')) {
    targetPath = path.resolve(path.dirname(containingFile), importPath);
  } else {
    // Third-party package or node_module (skip)
    return null;
  }

  const extensions = ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.jsx', '/index.js'];
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
    return targetPath;
  }

  for (const ext of extensions) {
    const candidate = targetPath + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

/**
 * Inspects a source file for H1 JSX tags and recursively checks imported local components.
 */
function scanFileForH1(
  filePath: string,
  visitedFiles: Set<string> = new Set()
): { count: number; locations: string[] } {
  if (visitedFiles.has(filePath)) {
    return { count: 0, locations: [] };
  }
  visitedFiles.add(filePath);

  if (!fs.existsSync(filePath)) {
    return { count: 0, locations: [] };
  }

  const code = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  let count = 0;
  const locations: string[] = [];
  const importsToScan: string[] = [];

  function visit(node: ts.Node) {
    // Check static ESM imports
    if (ts.isImportDeclaration(node)) {
      if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const importPath = node.moduleSpecifier.text;
        const resolved = resolveImportPath(importPath, filePath);
        if (resolved && (resolved.endsWith('.tsx') || resolved.endsWith('.jsx'))) {
          importsToScan.push(resolved);
        }
      }
    }

    // Check dynamic imports (e.g., import('./Co2Dashboard') or dynamic(() => import(...)))
    if (ts.isCallExpression(node)) {
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.length > 0) {
        const arg = node.arguments[0];
        if (ts.isStringLiteral(arg)) {
          const resolved = resolveImportPath(arg.text, filePath);
          if (resolved && (resolved.endsWith('.tsx') || resolved.endsWith('.jsx'))) {
            importsToScan.push(resolved);
          }
        }
      }
    }

    // Check JSX opening elements & self-closing elements
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = node.tagName.getText(sourceFile);

      // Direct H1 tag (<h1 ...> or <motion.h1 ...>)
      if (tagName === 'h1' || tagName === 'motion.h1' || tagName.endsWith('.h1')) {
        count++;
        const lineAndChar = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        const relPath = path.relative(ROOT_DIR, filePath);
        locations.push(`${relPath}:${lineAndChar.line + 1}:${lineAndChar.character + 1} (<${tagName}>)`);
      } else {
        // Component rendered with as="h1" attribute (e.g. <SectionHead as="h1" />)
        for (const attr of node.attributes.properties) {
          if (ts.isJsxAttribute(attr) && attr.name.getText(sourceFile) === 'as') {
            if (attr.initializer && ts.isStringLiteral(attr.initializer) && attr.initializer.text === 'h1') {
              count++;
              const lineAndChar = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
              const relPath = path.relative(ROOT_DIR, filePath);
              locations.push(`${relPath}:${lineAndChar.line + 1}:${lineAndChar.character + 1} (<${tagName} as="h1">)`);
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  // Recursively scan imported local component files
  for (const importedFile of importsToScan) {
    const subResult = scanFileForH1(importedFile, visitedFiles);
    count += subResult.count;
    locations.push(...subResult.locations);
  }

  return { count, locations };
}

/**
 * Recursively finds all page.tsx files in app/[locale]
 */
function findPageFiles(dir: string): string[] {
  let pages: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pages = pages.concat(findPageFiles(fullPath));
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      pages.push(fullPath);
    }
  }

  return pages;
}

/**
 * Converts a file path to its clean route representation.
 */
function getRouteFromPath(filePath: string): string {
  const relPath = path.relative(APP_LOCALE_DIR, filePath);
  let route = '/' + relPath.replace(/\/page\.tsx$/, '').replace(/^page\.tsx$/, '');
  if (route === '/.') route = '/';
  return route;
}

function runVerification() {
  console.log('========================================================================');
  console.log('  K-AQUA READ-ONLY VERIFICATION: H1 TAG AUDIT ACROSS ALL PAGE ROUTES');
  console.log('========================================================================\n');

  if (!fs.existsSync(APP_LOCALE_DIR)) {
    console.error(`Error: Directory not found: ${APP_LOCALE_DIR}`);
    process.exit(1);
  }

  const pageFiles = findPageFiles(APP_LOCALE_DIR).sort();
  const results: PageRouteResult[] = [];
  let passedCount = 0;
  let failedCount = 0;

  for (const file of pageFiles) {
    const route = getRouteFromPath(file);
    const { count, locations } = scanFileForH1(file);
    const pass = count === 1;

    if (pass) passedCount++;
    else failedCount++;

    results.push({
      route,
      filePath: path.relative(ROOT_DIR, file),
      h1Count: count,
      h1Locations: locations,
      status: pass ? 'PASS' : 'FAIL',
    });
  }

  // Print Summary Table
  console.log(
    '| Status | H1 Count | Page Route                             | Primary H1 Location'
  );
  console.log(
    '|--------|----------|----------------------------------------|----------------------------------------------------'
  );

  for (const r of results) {
    const statusIcon = r.status === 'PASS' ? '✓ PASS' : '✖ FAIL';
    const paddedRoute = r.route.padEnd(38);
    const countStr = String(r.h1Count).padStart(8);
    const firstLoc = r.h1Locations[0] || 'NONE FOUND';
    console.log(`| ${statusIcon} | ${countStr} | ${paddedRoute} | ${firstLoc}`);
    if (r.h1Locations.length > 1) {
      for (let i = 1; i < r.h1Locations.length; i++) {
        console.log(`|        |          |                                        | EXTRA: ${r.h1Locations[i]}`);
      }
    }
  }

  console.log('\n========================================================================');
  console.log(`  H1 VERIFICATION SUMMARY`);
  console.log(`  Total Routes Audited : ${results.length}`);
  console.log(`  Passed (Exactly 1 H1): ${passedCount}`);
  console.log(`  Failed               : ${failedCount}`);
  console.log('========================================================================\n');

  if (failedCount > 0) {
    console.error('✖ H1 Tag verification FAILED: One or more routes do not have exactly 1 H1 tag.');
    process.exit(1);
  } else {
    console.log('✓ H1 Tag verification PASSED: Every route component has EXACTLY 1 H1 tag.');
    process.exit(0);
  }
}

runVerification();
