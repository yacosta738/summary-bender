# Summary Bender

Welcome to the Summary Bender application, an advanced tool that uses artificial intelligence to efficiently and accurately summarize emails.

## Documentation

Check out the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about working with the framework.

## Setup

Make sure to install the necessary dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview the production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Environment Variables

Ensure you set up the following environment variables in your `.env` file for the application to function properly:

```env
SUPABASE_URL="https://example.supabase.co"
SUPABASE_KEY="<your_key>"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
IMAP_HOST="imap.gmail.com"
IMAP_PORT=993
SMTP_USER="<your_email>"
SMTP_PASS="<your_password>"
OPENAI_API_KEY="<your_key>"
```

## Features

- **Email Summaries**: Uses artificial intelligence to summarize email content.
- **Supabase Integration**: Utilizes Supabase for database management.
- **SMTP/IMAP Support**: Supports email protocols for sending and receiving emails.
- **OpenAI API**: Integrates the OpenAI API to generate high-quality summaries.

## Contribution

If you want to contribute to this project, please open an issue or a pull request on the [GitHub repository](https://github.com/yacosta738/summary-bender).

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

Thank you for using Summary Bender!
