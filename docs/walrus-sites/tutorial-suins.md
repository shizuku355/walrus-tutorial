# Set a SuiNS name

## Note

Browsing sites with b36 subdomains (e.g. `https://1lupgq2auevjruy7hs9z7tskqwjp5cc8c5ebhci4v57qyl4piy.wal.app`) is no longer possible using the `wal.app` portal. 

To browse Walrus Sites using the `wal.app` portal, [use SuiNS names instead](./tutorial-suins.html#get-a-suins-name).

Walrus Sites require using SuiNS names to assign a human-readable name to a Walrus Site. This is done by getting a SuiNS name and pointing it to the object ID of the Walrus Site.

## Get a SuiNS name

- Navigate to [SuiNS.io](https://suins.io) (mainnet) or [Testnet SuiNS.io](https://testnet.suins.io) (testnet)
- Buy a domain name with your wallet (e.g., `walrusgame`)

> At the moment, you can only select names that are composed of letters `a-z` and numbers `0-9`, but no special characters (e.g., `-`).

## Map the SuiNS name to the Walrus Site

1. Go to "names you own" section at SuiNS.io
2. Click the "three dots" menu icon above the name you want to map
3. Click "Link To Walrus Site"
4. Paste the object ID of the Walrus Site
5. Check that it is correct and click "Apply"

After approving the transaction, you can browse `https://walrusgame.wal.app`

## Backwards Compatibility

If you previously linked a SuiNS domain to a Walrus Site using "Link To Wallet Address", those links remain valid. However, the recommended procedure is to use the new "Link To Walrus Site" method for new sites and updates.

The portal will:
- First check if the domain is linked using "Link to Walrus Site"
- If not found, fallback to the old "Link To Wallet Address" method