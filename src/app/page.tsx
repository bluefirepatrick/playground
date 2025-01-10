"use client";

import { Link } from "react-aria-components";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Readium Playground (Under Development)</h1>

      <p>Here’s a quick access to a reflowable and a Fixed-Layout Publication:</p>

      <ul>
        <li>
          <Link href="/read?book=http://localhost:15080/bW9ieS1kaWNrLmVwdWI">Moby Dick (reflow)</Link>
        </li>
        <li>
          <Link href="/read?book=https%3A%2F%2Fpublication-server.readium.org%2FQmVsbGFPcmlnaW5hbDMuZXB1Yg">Bella the Dragon (FXL)</Link>
        </li>
      </ul>
    </main>
  );
}
