# Writing your GitHub Workflow

## Key Requirement: Pre-built Site Directory

The Deploy Walrus Site action requires an **already built site directory**. This means:

- For static files (HTML, CSS, JS), you can use the action directly
- For sites needing build steps (React, Vue, Svelte), you must include build steps in your workflow

## Using the Deploy Walrus Site GitHub Action

Required inputs:
- `SUI_ADDRESS`: Your Sui address
- `SUI_KEYSTORE`: Your private key in base64 format
- `DIST`: Path to your **built** site directory

Optional inputs:
- `SUI_NETWORK`: Target network (defaults to `mainnet`)
- `EPOCHS`: Number of epochs to keep site stored (defaults to `5`)
- `GITHUB_TOKEN`: Enables automatic pull request creation for site resource changes

### About `GITHUB_TOKEN`

To use this feature:
1. Set `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` in your workflow
2. Add these permissions:
   ```yaml
   permissions:
     contents: write
     pull-requests: write
   ```

### New Site vs Existing Site

**New site:**
- Creates a new Walrus Site on Sui
- Generates `ws-resources.json`
- May create a pull request with changes

**Existing site:**
- Uses existing `object_id` to update the same site
- Creates PRs only if resources file changes

## Creating Your Workflow

1. Create `.github/workflows/deploy-site.yml`
2. Add repository checkout step
3. If site needs building:
   - Set up build environment
   - Add build commands
4. Set `DIST` path to deployable static files directory
5. Add Deploy Walrus Site action with secrets and variables

## Example Workflows

Reference example workflows in the [Walrus Sites GitHub repository](https://github.com/MystenLabs/walrus-sites/tree/main/.github/workflows):
- `deploy-snake.yml`: Simple static site deployment
- `deploy-vite-react-ts.yml`: React application with build step

For more details, consult the [GitHub Actions documentation](https://docs.github.com/en/actions).