import HomeLanding from "./home-landing";
import type { Album } from "./types";

export default async function Home() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/albums",
    { next: { revalidate: 60 } },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  const albums: Album[] = (await response.json()).slice(0, 10);

  return <HomeLanding albums={albums} />;
}
