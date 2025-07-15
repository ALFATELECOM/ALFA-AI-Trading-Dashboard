import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>ALFA AI Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
        <h1>ALFA AI Dashboard</h1>
        <p>This is your AI trading frontend running successfully!</p>
        <p>You can now integrate strategy buttons, capital settings, or broker controls.</p>
      </main>
    </>
  );
}
