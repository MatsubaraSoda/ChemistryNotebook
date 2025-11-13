#!/usr/bin/env bash
set -e

QUARTO_VERSION="1.8.26"
QUARTO_TGZ="quarto-${QUARTO_VERSION}-linux-amd64.tar.gz"
QUARTO_DIR="quarto-${QUARTO_VERSION}"

echo "Downloading Quarto v${QUARTO_VERSION}..."
curl -fL -o "${QUARTO_TGZ}" "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/${QUARTO_TGZ}"

echo "Installing Quarto v${QUARTO_VERSION}..."
rm -rf "${QUARTO_DIR}"

tar -xzf "${QUARTO_TGZ}"

if [ ! -d "${QUARTO_DIR}" ]; then
    echo "Error: Quarto directory not found after extraction"
    exit 1
fi

export PATH=$PATH:$(pwd)/${QUARTO_DIR}/bin

echo "Quarto installed successfully."
quarto --version

echo "Temporarily renaming Quarto directory to prevent scanning..."
mv "${QUARTO_DIR}" ".${QUARTO_DIR}"

export PATH="$(pwd)/.${QUARTO_DIR}/bin:${PATH}"

echo "Building the website..."
quarto render

echo "Restoring Quarto directory name..."
mv ".${QUARTO_DIR}" "${QUARTO_DIR}"

export PATH="$(pwd)/${QUARTO_DIR}/bin:${PATH}"

echo "Cleaning up temporary files..."
rm -f "${QUARTO_TGZ}"

echo "Build completed successfully."