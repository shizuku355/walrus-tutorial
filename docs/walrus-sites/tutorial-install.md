# Installing the Site Builder

## Prerequisites

Before starting, ensure you:
- Have a recent version of [Rust](https://www.rust-lang.org/tools/install) installed
- Followed all Walrus setup instructions

## Installation

Binaries are available for multiple platforms:

### Mainnet Binaries

| OS      | CPU             | Architecture | Download Link |
|---------|-----------------|--------------|--------------|
| Ubuntu  | Intel 64bit     | `site-builder-mainnet-latest-ubuntu-x86_64` | [Link](https://storage.googleapis.com/mysten-walrus-binaries/site-builder-mainnet-latest-ubuntu-x86_64) |
| MacOS   | Apple Silicon   | `site-builder-mainnet-latest-macos-arm64` | [Link](https://storage.googleapis.com/mysten-walrus-binaries/site-builder-mainnet-latest-macos-arm64) |
| MacOS   | Intel 64bit     | `site-builder-mainnet-latest-macos-x86_64` | [Link](https://storage.googleapis.com/mysten-walrus-binaries/site-builder-mainnet-latest-macos-x86_64) |
| Windows | Intel 64bit     | `site-builder-mainnet-latest-windows-x86_64.exe` | [Link](https://storage.googleapis.com/mysten-walrus-binaries/site-builder-mainnet-latest-windows-x86_64.exe) |

### Download Method

For mainnet:
```bash
SYSTEM= # set to your system: ubuntu-x86_64, macos-x86_64, macos-arm64, windows-x86_64.exe
curl https://storage.googleapis.com/mysten-walrus-binaries/site-builder-mainnet-latest-$SYSTEM -o site-builder
chmod +x site-builder
```

## Configuration

Create a `sites-config.yaml` file with contexts for different networks:

```yaml
contexts:
  testnet:
    package: 0xf99aee9f21493e1590e7e5a780c65c6b8f30bb063ad6ae64bd8b7ee1c4b1ee7e
    portal_package: 0x30b0fa6b57e9f5088ab29b7c70cb5f2bb8b8e0c21e3c7e9b0b5e7b7b5b7b5b7b
    aggregator: https://walrus-testnet-aggregator.nodes.guru
    publisher: https://walrus-testnet-publisher.nodes.guru
  mainnet:  
    package: 0x4c2d5c0b2e7f8e5b5c7b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b
    portal_package: 0x5d3e6c1c3f8f9f6c6d8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c
    aggregator: https://walrus-mainnet-aggregator.nodes.guru  
    publisher: https://walrus-mainnet-publisher.nodes.guru
```