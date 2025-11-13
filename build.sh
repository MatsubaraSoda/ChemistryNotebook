#!/usr/bin/env bash
set -e

QUARTO_VERSION="1.8.26"
QUARTO_TGZ="quarto-${QUARTO_VERSION}-linux-amd64.tar.gz"
QUARTO_DIR="quarto-${QUARTO_VERSION}"

echo "=========================================="
echo "Quarto Build Process"
echo "=========================================="
echo ""

echo "Step 1: Downloading Quarto v${QUARTO_VERSION}..."
curl -fL -o "${QUARTO_TGZ}" "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/${QUARTO_TGZ}"
echo "✓ Download completed ($(ls -lh ${QUARTO_TGZ} | awk '{print $5}'))"
echo ""

echo "Step 2: Extracting Quarto..."
rm -rf "${QUARTO_DIR}"
tar -xzf "${QUARTO_TGZ}"

if [ ! -d "${QUARTO_DIR}" ]; then
    echo "✗ Error: Quarto directory not found after extraction"
    exit 1
fi
echo "✓ Extraction completed"
echo ""

echo "Step 3: Setting up PATH..."
export PATH=$PATH:$(pwd)/${QUARTO_DIR}/bin
echo "✓ PATH updated"
echo ""

echo "Step 4: Verifying Quarto installation..."
quarto --version
echo ""

echo "Step 5: Checking project files..."
echo "Current directory: $(pwd)"
echo "Project files:"
ls -la | grep -E "\.(ipynb|qmd|yaml)$|^中心科学" || echo "  (checking files...)"
echo ""

echo "Step 6: Checking for Quarto directory (should be excluded)..."
if [ -d "${QUARTO_DIR}" ]; then
    echo "  Found: ${QUARTO_DIR} (this should be excluded from rendering)"
fi
echo ""

echo "Step 7: Building the website..."
quarto render
echo ""

echo "Step 8: Verifying build output..."
if [ -d "_site" ]; then
    echo "✓ Build successful! _site directory created"
    echo "  Files in _site:"
    find _site -type f | head -10
    echo "  Total files: $(find _site -type f | wc -l)"
else
    echo "✗ Error: _site directory not found"
    exit 1
fi
echo ""

echo "Step 9: Cleaning up..."
rm -f "${QUARTO_TGZ}"
echo "✓ Temporary files removed"
echo ""

echo "=========================================="
echo "Build completed successfully!"
echo "=========================================="