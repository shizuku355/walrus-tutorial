# Specifying Headers, Routing, and Metadata in Walrus Sites

Walrus Sites allows advanced configuration through a `ws-resources.json` file, which enables customization of site behavior beyond basic static asset serving.

## The `ws-resources.json` File

The configuration file is JSON-formatted and can be placed in the site's root directory. It is not uploaded with site resources and can be optionally specified using the `--ws-resources` flag.

### Example Configuration

```json
{
  "headers": {
    "/index.html": {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "max-age=3500"
    }
  },
  "routes": {
    "/*": "/index.html",
    "/accounts/*": "/accounts.html",
    "/path/assets/*": "/assets/asset_router.html"
  },
  "metadata": {
    "link": "https://subdomain.wal.app",
    "image_url": "https://www.walrus.xyz/walrus-site",
    "description": "This is a walrus site.",
    "project_url": "https://github.com/MystenLabs/walrus-sites/",
    "creator": "MystenLabs"
  },
  "site_name": "My Walrus Site",
  "object_id": "0xe674c144119a37a0ed9cef26a962c3fdfbdbfd86a3b3db562ee81d5542a4eccf",
  "ignore": ["/private/*", "/secret.txt", "/images/tmp/*"]
}
```

## Key Configuration Sections

### HTTP Response Headers
- Specify custom headers for specific resources
- Default headers are automatically inferred based on file extensions

### Client-Side Routing
- Define routing rules for single-page applications
- Use wildcard (`*`) patterns to match routes
- Longest matching route is served when a resource is not found

### Metadata
- Add human-readable information for wallets and explorers
- Optional fields like link, image URL, description, project URL, and creator

### Site Name
- Define a human-readable name for your site

### Object ID
- Automatically managed by the site builder
- Used to identify and update existing sites

### Ignore Patterns
- Specify files and directories to exclude from deployment
- Supports glob patterns for flexible filtering