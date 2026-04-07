 export default async function Home() {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  if (!response.ok) throw new Error('Failed to fetch posts');

  const albums = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols">
      {albums.map((album: { id: number, title: string }) => (
        <div key={album.id} className="border p-4">
          <h2 className="text-lg font-bold">{album.title}</h2>
          <p className="text-sm text-gray-500">Album ID: {album.id}</p>
        </div>
      ))}
    </div>
  );
}
