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
### Using Gmail

To use Gmail as your email provider, you need to set up an app password and enable IMAP. Follow these steps:

	1.	Enable IMAP in Gmail: Follow the instructions in this [Google support article](https://support.google.com/mail/answer/7126229) to enable IMAP for your Gmail account.
	2.	Create an App Password: If you have 2-Step Verification enabled, you need to create an app password to use with your email application. Follow the instructions in this [Google support article](https://support.google.com/accounts/answer/185833) to create an app password.

Replace <your_email> with your Gmail address and <your_app_password> with the app password you created.


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
