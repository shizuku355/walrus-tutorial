# Preparing Your Deployment Credentials

To allow the GitHub Action to deploy your Walrus Site, you need to securely provide it with your private key and corresponding public address.

## Prerequisites

You must have the `sui` binary installed. Follow the official [Sui installation guide](https://docs.sui.io/guides/developer/getting-started/sui-install).

## Exporting Your Private Key

> **Best Practice**: Use a dedicated Sui address for each GitHub workflow for better security isolation.

### From Sui CLI

1. Generate a new key:
   ```
   sui keytool generate ed25519 # Or secp256k1 or secp256r1
   ```

2. The command creates a file `<SUI_ADDRESS>.key` with the private key in `base64WithFlag` format.

3. The filename is your new Sui Address, which you'll use for the `SUI_ADDRESS` variable.

> **Note**: For existing keys, check `~/.sui/sui_config/sui.keystore` file.

### From Slush Wallet

1. Open Slush extension and select the account for deployments.

2. Export the private key (in bech32 format).

3. Convert the key using:
   ```
   sui keytool convert <suiprivkey...>
   ```

4. Copy the `base64WithFlag` value for the `SUI_KEYSTORE` secret.

## Funding Your Address

### Testnet Funding
1. Get SUI tokens from the [Sui faucet](https://faucet.sui.io/)
2. Exchange Testnet SUI for Testnet WAL using `walrus get-wal` or [stake-wal.wal.app](https://stake-wal.wal.app/?network=testnet)

### Mainnet Funding
Acquire SUI and WAL tokens from exchanges or token swap services.

## Adding Credentials to GitHub

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** > **Actions**
3. Add a new repository secret `SUI_KEYSTORE`:
   ```json
   ["AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]
   ```
4. Add a new repository variable `SUI_ADDRESS` with your Sui address

> **Security Note**: Never share your private key or commit it to version control. GitHub secrets are encrypted and only accessible to workflows.