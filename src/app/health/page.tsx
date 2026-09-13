type OpenLibrarySearchResponse = {
  docs?: { title?: string }[];
};

export default async function HealthPage() {
  const checkedAt = new Date().toISOString();
  let status: "OK" | "ERROR" = "OK";
  let bookTitle: string | null = null;
  let errorMessage: string | null = null;

  try {
    const response = await fetch(
      "https://openlibrary.org/search.json?q=harry+potter&limit=1",
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = (await response.json()) as OpenLibrarySearchResponse;
    const title = data.docs?.[0]?.title;

    if (!title) {
      throw new Error("No book title in response");
    }

    bookTitle = title;
  } catch (error) {
    status = "ERROR";
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <main className="bg-background p-8 text-foreground">
      <h1>Health Check</h1>
      <p>Status: {status}</p>
      {status === "OK" ? <p>{bookTitle}</p> : <p>{errorMessage}</p>}
      <p>{checkedAt}</p>
    </main>
  );
}
