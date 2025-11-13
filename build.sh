#!/usr/bin/env bash
set -e

QUARTO_VERSION="1.8.26"
QUARTO_TGZ="quarto-${QUARTO_VERSION}-linux-amd64.tar.gz"

echo "=========================================="
echo "Quarto Build Script - Debug Version"
echo "=========================================="
echo ""

echo "Step 1: Environment Information"
echo "--------------------------------"
echo "Current directory: $(pwd)"
echo "Working directory contents:"
ls -la
echo ""

echo "Step 2: Download Quarto"
echo "--------------------------------"
echo "Quarto version: ${QUARTO_VERSION}"
echo "Download URL: https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/${QUARTO_TGZ}"
echo "Target file: ${QUARTO_TGZ}"
echo ""

if [ -f "${QUARTO_TGZ}" ]; then
    echo "Warning: ${QUARTO_TGZ} already exists, will be overwritten"
    ls -lh "${QUARTO_TGZ}"
else
    echo "${QUARTO_TGZ} does not exist, will download"
fi

echo "Starting download..."
curl -fL -o "${QUARTO_TGZ}" "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/${QUARTO_TGZ}"

echo "Download completed. File info:"
ls -lh "${QUARTO_TGZ}"
echo ""

echo "Step 3: Extract Quarto Archive"
echo "--------------------------------"
echo "Checking if quarto-${QUARTO_VERSION} directory exists..."
if [ -d "quarto-${QUARTO_VERSION}" ]; then
    echo "Warning: quarto-${QUARTO_VERSION} directory exists, contents:"
    ls -la "quarto-${QUARTO_VERSION}"
    echo "Removing existing directory..."
    rm -rf "quarto-${QUARTO_VERSION}"
fi

echo "Extracting ${QUARTO_TGZ}..."
tar -xzf "${QUARTO_TGZ}"

echo "Extraction completed. Checking extracted contents..."
if [ -d "quarto-${QUARTO_VERSION}" ]; then
    echo "✓ Found quarto-${QUARTO_VERSION} directory"
    echo "Directory structure (first level):"
    ls -la "quarto-${QUARTO_VERSION}/"
    echo ""
    echo "Looking for bin directory:"
    if [ -d "quarto-${QUARTO_VERSION}/bin" ]; then
        echo "✓ Found bin directory"
        ls -la "quarto-${QUARTO_VERSION}/bin/"
        echo ""
        if [ -f "quarto-${QUARTO_VERSION}/bin/quarto" ]; then
            echo "✓ Found quarto binary"
            ls -lh "quarto-${QUARTO_VERSION}/bin/quarto"
            echo ""
            echo "Testing quarto binary:"
            "quarto-${QUARTO_VERSION}/bin/quarto" --version || echo "Warning: Could not execute quarto binary"
        else
            echo "✗ quarto binary not found in bin/"
        fi
    else
        echo "✗ bin directory not found"
    fi
    echo ""
    echo "Looking for share directory:"
    if [ -d "quarto-${QUARTO_VERSION}/share" ]; then
        echo "✓ Found share directory"
        echo "Share directory structure:"
        find "quarto-${QUARTO_VERSION}/share" -type d -maxdepth 3 | head -20
        echo ""
    else
        echo "✗ share directory not found"
    fi
else
    echo "✗ quarto-${QUARTO_VERSION} directory not found after extraction"
    echo "Current directory contents after extraction:"
    ls -la
    exit 1
fi
echo ""

echo "Step 4: Setup PATH"
echo "--------------------------------"
echo "Current PATH: ${PATH}"
echo "Quarto bin path: $(pwd)/quarto-${QUARTO_VERSION}/bin"
NEW_PATH="$(pwd)/quarto-${QUARTO_VERSION}/bin:${PATH}"
echo "New PATH will be: ${NEW_PATH}"
export PATH="$(pwd)/quarto-${QUARTO_VERSION}/bin:${PATH}"
echo "PATH updated. Current PATH: ${PATH}"
echo ""

echo "Step 5: Verify Quarto Installation"
echo "--------------------------------"
echo "Testing 'quarto' command..."
which quarto || echo "Warning: 'quarto' command not found in PATH"

echo "Testing quarto version..."
if command -v quarto &> /dev/null; then
    echo "Quarto command found, executing --version:"
    quarto --version
    echo ""
    echo "Quarto command location:"
    which quarto
    echo ""
    echo "Quarto binary details:"
    ls -lh "$(which quarto)"
else
    echo "✗ quarto command not available"
    echo "Trying direct path:"
    "$(pwd)/quarto-${QUARTO_VERSION}/bin/quarto" --version || echo "Direct path also failed"
fi
echo ""

echo "Step 6: Check Project Files"
echo "--------------------------------"
echo "Checking for _quarto.yaml:"
if [ -f "_quarto.yaml" ]; then
    echo "✓ Found _quarto.yaml"
    echo "First few lines:"
    head -10 _quarto.yaml
else
    echo "✗ _quarto.yaml not found"
fi
echo ""

echo "Checking for .ipynb files:"
IPYNB_COUNT=$(find . -name "*.ipynb" -not -path "./quarto-*" | wc -l)
echo "Found ${IPYNB_COUNT} .ipynb files"
find . -name "*.ipynb" -not -path "./quarto-*" | head -10
echo ""

echo "Checking for _site directory:"
if [ -d "_site" ]; then
    echo "✓ _site directory exists"
    echo "Contents:"
    ls -la _site/ | head -20
else
    echo "_site directory does not exist (will be created)"
fi
echo ""

echo "Step 7: Project Configuration"
echo "--------------------------------"
echo "Checking _quarto.yaml configuration:"
if [ -f "_quarto.yaml" ]; then
    grep -E "type:|output-dir:" _quarto.yaml || echo "Could not find type or output-dir"
fi
echo ""

echo "Step 8: Render Project"
echo "--------------------------------"
echo "Current working directory: $(pwd)"
echo "Quarto executable: $(which quarto)"
echo "Quarto version:"
quarto --version
echo ""
echo "Starting quarto render..."
echo "Command: quarto render"
echo ""

quarto render

echo ""
echo "Step 9: Check Render Output"
echo "--------------------------------"
if [ -d "_site" ]; then
    echo "✓ _site directory exists after render"
    echo "_site directory contents:"
    ls -la _site/
    echo ""
    echo "File count in _site:"
    find _site -type f | wc -l
    echo "Directory count in _site:"
    find _site -type d | wc -l
else
    echo "✗ _site directory was not created"
fi
echo ""

echo "Step 10: Cleanup"
echo "--------------------------------"
echo "Cleaning up ${QUARTO_TGZ}..."
rm -f "${QUARTO_TGZ}"
echo "Cleanup completed"
echo ""

echo "=========================================="
echo "Build completed successfully."
echo "=========================================="