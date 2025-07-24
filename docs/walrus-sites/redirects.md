# Redirecting Objects to Walrus Sites

## The Goal

The goal is to tie a collection of NFTs to specific, potentially unique Walrus Sites. For example, the [Flatland project](https://flatland.wal.app) creates a personalized Walrus Site for each minted NFT.

## Redirect Links

The solution involves adding a "redirect" in the NFT's `Display` property. When an NFT's object ID is browsed, the portal checks the `Display` for a `walrus site address` key and redirects to the corresponding Walrus Site.

### Redirects in Move

When creating the NFT's `Display`, you can include a key-value pair pointing to the Walrus Site:

```move
const VISUALIZATION_SITE: address = @0x901fb0...;
display.add(b"walrus site address".to_string(), VISUALIZATION_SITE.to_string());
```

### Personalizing the Site Based on NFT Properties

The Walrus Site can use the NFT's object ID (from the subdomain) to:
1. Fetch the NFT from the chain
2. Use the NFT's internal fields to modify the displayed site

For a complete example, refer to the [Flatland repository](https://github.com/MystenLabs/example-walrus-sites/tree/main/flatland).

This approach allows for dynamic, NFT-specific site generation and customization.