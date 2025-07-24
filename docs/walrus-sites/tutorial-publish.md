# Publishing a Walrus Site

## Select the Source Material for the Site

The `site-builder` uploads a directory of files from any web framework to Walrus, adding metadata to Sui. The directory must have an `index.html` file as the entry point.

Use the [example-Walrus-sites](https://github.com/MystenLabs/example-walrus-sites) repository for reference. For this tutorial, we'll publish the `walrus-snake` game.

Clone the repository:

```bash
git clone https://github.com/MystenLabs/example-walrus-sites.git && cd example-walrus-sites
```

## Publish the Site

Publish the `./walrus-snake` site using:

```bash
site-builder deploy ./walrus-snake --epochs 1
```

> Tip: Epoch duration varies by network. Testnet is one day, Mainnet is two weeks.

The output will show:
- Created resources for each file
- Site object ID
- URLs to browse the site

## Update the Site

To update the site, edit files (e.g., changing a title in `index.html`), then redeploy:

```bash
site-builder deploy --epochs 1 ./walrus-snake
```

> Note: Only the site owner can update the site.

### Extending Site Expiration

Use the `update` command with `--check-extend` to extend blob expiration:

```bash
site-builder update --check-extend --epochs 1
```

This ensures all site resources remain available for the specified epochs.