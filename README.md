# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deploying
To deploy this application to a static hosting provider, you'll first need to make an adjustment to the build. For some reason, the prerendered HTML document is not included in the `build/` directory. See [this post](https://www.closingtags.com/prerendered-pains/) for information related to the problem. The workaround is as simple as copying `.sveltekit-kit/output/prerender/pages/index.html` to `build/index.html`. Once done, you can then copy `build/` on to the root web directory of your static host.
