# Linking from and to Walrus Sites

## Walrus Sites Links Are Currently Unavailable

**Note**: This feature is currently unavailable on server-side portals like https://wal.app.

## Linking Basics

### Linking Within the Same Site
- Relative and absolute links work normally
- Example: `href="/path/to/resource.html"`

### Linking to Web Resources
- External web links function as expected
- Example: `href="https://some.cdn.example.com/stylesheet.css"`

### Linking to Other Walrus Sites

#### The Solution: Walrus Sites Links

**Warning**: Only available for service-worker based portals.

Portals can interpret special links and redirect to corresponding Walrus Sites resources.

Link formats:
1. Using SuiNS name: `https://gallery.suiobj/walrus_arctic.webp`
2. Using object ID: `https://abcd123….suiobj/walrus_arctic.webp`
3. Using blob ID: `https://blobid.walrus/qwer5678…`

The portal will extract the blob ID and redirect the request to the appropriate aggregator.