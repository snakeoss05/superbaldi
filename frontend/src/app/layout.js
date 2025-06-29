"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Store } from "../lib/store";
import Layout from "./client/components/layout";
import { Suspense } from "react";
import Loading from "./loading";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-family-sans-serif",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta
          name="description"
          content="Mary's simple recipe for maple bacon donuts
           makes a sticky, sweet treat with just a hint
           of salt that you'll keep coming back for."></meta>
        <link rel="icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Teko:wght@300..700&display=swap"
          rel="stylesheet"></link>
        <title>Super Baldi</title>
      </head>
      <body className={cairo.variable}>
        <Provider store={Store}>
          <Suspense fallback={<Loading />}>
            <Layout>{children}</Layout>
          </Suspense>
        </Provider>

        <Toaster />
      </body>
    </html>
  );
}
