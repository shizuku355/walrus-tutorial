# Configuring the Site Builder

## Minimal Configuration

The site builder configuration file can be located in default locations or specified with the `--config` flag. For first-time users, running the `site-builder` without explicit configuration is typically sufficient if installation steps were followed correctly.

## Additional Options

Configuration options include:

### Required Option
- `package`: Object ID of the Walrus Sites package on Sui (must be specified)

### Optional Configuration Variables
- `portal`: Portal name for site viewing (default: `wal.app`)

### General Options
- `rpc_url`: Sui RPC node URL
- `wallet`: Pointer to Sui wallet
- `walrus_binary`: Path to `walrus` binary (defaults to `$PATH`)
- `walrus_config`: Walrus client configuration
- `gas_budget`: Maximum gas for transactions (default: 500M MIST)

> Note: Package upgrades may require updating the `package` field in the configuration file.

## Configuration File Location
- Default locations available
- Can be explicitly set using `--config` flag
- Recommended to follow installation instructions for initial setup

The configuration allows flexible customization of the site builder's behavior while providing sensible defaults for most use cases.