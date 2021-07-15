import Head from "next/head";
import { ApartmentsList } from "../client/components/ApartmentsList";

export default function Index() {
  return (
    <>
      <Head>
        <title>Clerk Airtable Apartment Hunt</title>
        <meta name="description" content="Clerk Airtable Apartment Hunt" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ApartmentsList />
    </>
  );
}
