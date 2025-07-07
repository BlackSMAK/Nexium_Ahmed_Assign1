# **Quote On the Go!: SMAK's Minimalistic Quote Generator**

A modern, responsive Quote Generator built with Next.js 14 App Router, Tailwind CSS, and deployed via Vercel.

This app displays random inspirational quotes with support for light and dark themes, and includes social links in the footer.

## **Features**

. Built with Next.js App Router

. Styled using Tailwind CSS

. Light/Dark Theme Toggle

. Fully Responsive UI

. Refresh button to generate new quotes

. Social icons in footer

. Environment-safe setup using .env files

. Deployed with Vercel

. Live Demo

. View Live on Vercel

## **Getting Started**

#### -> Clone the project and install dependencies:
```bash
git clone https://github.com/yourusername/Nexium_Ahmed_Assign1.git
```
#### -> Then navigate into the project directory:
```bash
cd Nexium_Ahmed_Assign1
```
#### -> Install dependencies:
```bash
npm install
```
#### -> Then, run the development server:
```bash
npm run dev
```

Visit http://localhost:3000 to view it in your browser.

## **Project Structure**

├── app/                 // App Router pages
├── components/          // Reusable UI components
├── public/              // Static files 
├── styles/              // Global styles 
├── .env                 // Environment variables
└── tailwind.config.js   // Tailwind config

## **Environment Variables**

Create a .env file from .env.example if needed. Currently, no API keys are required, but keep this for future extensibility.

## **Scripts**
#### Run the server in development mode:
```bash
npm run dev
```
#### Run the build script to prepare for production:
```bash
npm run build
```
#### Start the production server:
```bash
npm run start
```  

## **Deployment**

This project is fully configured for Vercel deployment (currently deployed as well).

Push your code to GitHub.

Connect your GitHub repo to Vercel.

Vercel auto-deploys on every push to main.

Deploy with Vercel

## **Customization**

Quote Color / Font: Controlled via Tailwind classes in app/page.tsx.

Theme Handling: Uses next-themes. Toggle logic is in components/ThemeToggle.tsx.

Favicon: Replace public/favicon.ico with your own icon. Use tools like favicon.io to generate one.

## **License**

This project is open source under the MIT License.

Copyright © 2025 Syed Muhammad Ahmed Khalid (SMAK). All rights reserved.

## **Acknowledgements**

-> Next.js

-> Tailwind CSS

-> Vercel

-> [Quote APIs(not included) / Mock Data (included)]

## **Feedback**

Feel free to open an issue or PR if you'd like to improve something!

