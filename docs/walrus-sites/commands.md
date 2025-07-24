# Site Builder Commands

## Overview

The site builder provides several commands for managing Walrus Sites on Sui. The `--help` flag can provide additional details for each command.

## `deploy` Command

The primary command for managing Walrus Sites, with the following key behaviors:

### Behavior
- Determines site publication or update based on Object ID
- Prioritizes Object ID from:
  1. Command-line flag
  2. `ws-resources.json` file
  3. Publishing a new site

### Usage
```
site-builder deploy [OPTIONS] --epochs <EPOCHS> <DIRECTORY>
```

Key features:
- Requires `--epochs` flag (must be > 0)
- Automatically saves Object ID to `ws-resources.json`
- Optional `--list-directory` flag for file browsing

**Epoch Duration**:
- Testnet: 1 day per epoch
- Mainnet: 14 days per epoch
- Maximum: 53 epochs

## Other Commands

- `publish`: Create a new site (legacy)
- `update`: Update an existing site (legacy)
- `convert`: Convert object ID to Base36 format
- `site-map`: Show site resources
- `list-directory`: Generate directory index
- `destroy`: Remove site objects and assets
- `update-resource`: Add/update single site resource

**Note**: The `deploy` command is now recommended over `publish` and `update`.