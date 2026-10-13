# emsignerWeb

This is a [Next.js](https://nextjs.org) application using the App Router,
React, TypeScript, and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or later
- One of the following package managers:
  - [pnpm](https://pnpm.io/installation) 11.1.2 or later (recommended)
  - [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), which is included with Node.js

You can check your installed versions with:

```bash
node --version
pnpm --version
# or
npm --version
```

## Installation

Run the commands from the project directory:

```bash
cd my-app
```

### Using pnpm (recommended)

Install the dependencies from the committed lockfile:

```bash
pnpm install
```

### Using npm

Install the dependencies with npm:

```bash
npm install
```

The repository uses `pnpm-lock.yaml` as its canonical lockfile. If you use
npm, npm may create a `package-lock.json`; do not commit both lockfiles unless
the team has agreed to maintain both.

## Start the development server

Using pnpm:

```bash
pnpm dev
```

Using npm:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The
development server automatically reloads when you edit files.

## Available scripts

| Purpose | pnpm | npm |
| --- | --- | --- |
| Start the development server | `pnpm dev` | `npm run dev` |
| Check the application with ESLint | `pnpm lint` | `npm run lint` |
| Create a production build | `pnpm build` | `npm run build` |
| Start the production server | `pnpm start` | `npm run start` |

To run the production version locally:

```bash
pnpm build
pnpm start
```

Or with npm:

```bash
npm run build
npm run start
```

The production server is available at [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` - App Router pages, layouts, and global styles
- `public/` - Static assets served from the site root
- `next.config.ts` - Next.js configuration
- `package.json` - Project metadata, dependencies, and scripts

The main page is [src/app/page.tsx](src/app/page.tsx).

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Learn Next.js](https://nextjs.org/learn)
