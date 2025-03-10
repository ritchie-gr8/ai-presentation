
# SignSage

## Overview
SignSage is a personal project I developed to enhance my skills in Next.js and explore the integration of AI technologies. The app leverages the following technologies:

- **Frontend**: Next.js ⚛️, TailwindCSS 🌬️, Framer Motion 🎞️
- **Payment Integration**: Lemon Squeezy 💳 (Might change to Stripe later)
- **Database**: Prisma 🗃️
- **AI Integration**: OpenAI 🤖, Gemini AI 🧠
- **File Upload**: Using Uploadcare to handles image uploads, though this service may be replaced with a more cost-effective solution in the future.

SignSage is designed to provide users with AI-powered features to generate a presentation via user outline that user generate by a prompt. The app also includes a payment system powered by Lemon Squeezy for premium features. While the app is currently at its MVP (Minimum Viable Product) stage, there are still some pages and features that are under development. 🚧 

You can try the live version of the app here: [https://ai-presentation-puce.vercel.app/](https://ai-presentation-puce.vercel.app/) 

### Getting Started
To get started with SignSage, follow these steps:

1. **Clone the Repository**
```
git clone https://github.com/ritchie-gr8/SignSage.git
cd SignSage
```
2. **Install Dependencies**
_Note: This project uses Bun as the package manager._
```
bun install
```
3. **Set Up Environment Variables**
Create a `.env` file in the root directory and add the following environment variables:
```
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/callback
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/callback

NEXT_PUBLIC_HOST_URL='http://localhost:3000'

OPENAI_API_KEY=
GEMINI_API_KEY=

LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_VARIANT_ID=
LEMON_SQUEEZY_WEBHOOK_SECRET=
NEXT_PUBLIC_LEMON_SQUEEZY_API='https://api.lemonsqueezy.com/v1/'
```
4. **Run the Development Server**
```
bun run dev
```
5. **Open the App**
Open your browser and navigate to `http://localhost:3000`.

### Additional Notes:

-   Make sure to replace the placeholders (e.g.,  `DATABASE_URL`,  `OPENAI_API_KEY`, etc.) with your actual values.
    
-   If you want to make it even clearer, you can add a note explaining where to obtain these keys (e.g., "You can get your OpenAI API key from  [OpenAI's platform](https://platform.openai.com/).").
    
-   If there are any specific instructions for setting up the database or Clerk authentication, you might want to include those as well.

### Contributing
If you'd like to contribute to SignSage, feel free to fork the repository and submit a pull request. Please ensure you have the necessary API keys for OpenAI, Gemini AI, and Lemon Squeezy to test the AI and payment features.
