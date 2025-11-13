#!/usr/bin/env bash
set -e

QUARTO_VERSION="1.8.26"
QUARTO_TGZ="quarto-${QUARTO_VERSION}-linux-amd64.tar.gz"

echo "Downloading Quarto v${QUARTO_VERSION}..."
curl -fL -o "${QUARTO_TGZ}" "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/${QUARTO_TGZ}"

echo "Installing Quarto v${QUARTO_VERSION}..."
rm -rf quarto-bin "quarto-${QUARTO_VERSION}"
mkdir -p quarto-bin

tar -xzf "${QUARTO_TGZ}"

if [ -d "quarto-${QUARTO_VERSION}" ]; then
    mv "quarto-${QUARTO_VERSION}"/* quarto-bin/
    rmdir "quarto-${QUARTO_VERSION}"
fi

QUARTO_BIN_PATH=$(find quarto-bin -name quarto -type f | head -1)

if [ -z "$QUARTO_BIN_PATH" ]; then
    echo "Error: Quarto binary not found"
    exit 1
fi

QUARTO_BIN_DIR=$(dirname "$QUARTO_BIN_PATH")
export PATH=$PATH:$(pwd)/$QUARTO_BIN_DIR

echo "Quarto installed successfully."
quarto --version

echo "Building the website..."
quarto render

echo "Cleaning up temporary files..."
rm -f "${QUARTO_TGZ}"

echo "Build completed successfully."