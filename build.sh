#!/usr/bin/env bash
set -e

QUARTO_VERSION="1.8.26"
QUARTO_TGZ="quarto-${QUARTO_VERSION}-linux-amd64.tar.gz"

echo "Downloading Quarto v${QUARTO_VERSION}..."
curl -fL -o "${QUARTO_TGZ}" "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/${QUARTO_TGZ}"

echo "Installing Quarto v${QUARTO_VERSION}..."
rm -rf quarto-bin
mkdir -p quarto-bin
tar -xzf "${QUARTO_TGZ}" -C quarto-bin --strip-components=1

export PATH=$PATH:$(pwd)/quarto-bin/bin

echo "Quarto installed successfully."
quarto --version

echo "Building the website..."
quarto render

echo "Cleaning up temporary files..."
rm -f "${QUARTO_TGZ}"

echo "Build completed successfully."