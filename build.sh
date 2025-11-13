#!/usr/bin/env bash
set -e

QUARTO_VERSION="1.8.26"
QUARTO_DEB="quarto-${QUARTO_VERSION}-linux-amd64.deb"

echo "Downloading Quarto v${QUARTO_VERSION}..."
curl -fL -o "${QUARTO_DEB}" "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/${QUARTO_DEB}"

echo "Installing Quarto v${QUARTO_VERSION}..."
rm -rf quarto-bin
mkdir -p quarto-bin

dpkg-deb -x "${QUARTO_DEB}" quarto-bin

export PATH=$PATH:$(pwd)/quarto-bin/usr/bin

echo "Quarto installed successfully."
quarto --version

echo "Building the website..."
quarto render

echo "Cleaning up temporary files..."
rm -f "${QUARTO_DEB}"

echo "Build completed successfully."