# Set Up Your Own Copy of the Demo Site

This guide gets the Crawl Notes demo site running on your computer. It takes about 10 minutes. Your copy is completely separate, so nothing you change affects anyone else's site.

## Before you start

You need:

- A GitHub account with access to this repo. If it's private, accept the invitation sent to your email or shown on GitHub first.
- [Node.js](https://nodejs.org/) version 22.23.4 or later.
- [GitHub CLI](https://cli.github.com/), which lets you download a private repo.
- A browser and device that support passkeys. Most current ones do.
- An internet connection, because the demo images are downloaded during setup.

Run the commands below in a terminal, one step at a time.

## Steps

1. Check your Node.js version:

   ```bash
   node -v
   ```

   If the number is lower than 22.23.4, install a newer version from [nodejs.org](https://nodejs.org/).

2. Install pnpm, the package manager this project uses:

   ```bash
   npm install -g pnpm
   ```

3. Sign in to GitHub. If asked, choose GitHub.com and sign in with your browser:

   ```bash
   gh auth login
   ```

4. Download the project and open the site folder:

   ```bash
   gh repo clone nimajafari/emdash-astro
   cd emdash-astro/seo-demo
   ```

5. Install the project's dependencies:

   ```bash
   pnpm install
   ```

6. Create your private encryption key. This writes a `.env` file that stays on your computer:

   ```bash
   npx emdash secrets generate --write .env
   ```

7. Start the site:

   ```bash
   pnpm dev
   ```

   The terminal shows the address, usually `http://localhost:4321`. Leave this terminal open while you use the site.

8. Open the admin setup page in your browser. If the terminal showed a different port, use that number instead:

   ```text
   http://localhost:4321/_emdash/admin
   ```

9. Complete the setup wizard:

   1. Keep the suggested site title, or enter your own.
   2. Leave **Include sample content** ticked. This loads the demo posts.
   3. Enter your email address.
   4. Create a passkey when your browser asks.

10. Open `http://localhost:4321` to see your site. It should show the Crawl Notes home page and demo posts.

## Using it again later

To stop the site, press `Ctrl+C` in the terminal.

To start it again, open a terminal in the `seo-demo` folder and run:

```bash
pnpm dev
```

## Good to know

- **Your content stays local.** Posts, your admin account and uploaded images are saved only on your computer, and GitHub doesn't back them up.
- **Keep your `.env` file.** It stays out of the repo. Losing it means losing any secrets encrypted with that key.
- **Your passkey works only for your copy.** It won't sign you in to anyone else's site.

## If something goes wrong

| Problem | What to try |
| --- | --- |
| `gh repo clone` says the repo can't be found | Accept the GitHub invitation, then check you signed in with the invited account |
| `pnpm` or `gh` isn't recognized | Close the terminal, open a new one, and try again |
| Install or start fails with a Node.js version error | Install Node.js 22.23.4 or later, then repeat from step 5 |
| The site uses a port other than 4321 | Use the address shown in the terminal |
| The passkey step fails | Use the `localhost` address shown in the terminal, or try another browser |
| Images are missing | Check your internet connection during setup |
