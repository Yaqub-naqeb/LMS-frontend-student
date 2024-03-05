export default function Books() {
  const books = [
    {
      id: "1",
      name: "abdulla",
    },
    { id: "2", 
    name: "yaqwb" },
  ];

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
    </div>
  );
}
