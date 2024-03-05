import BookCard from "../../components/buttons/cards/BookCard";
import Image from '../../assets/KoyaUni.png'
import Image2 from '../../assets/download.jpeg'
export default function Books() {
  const books = [
    {
      id: "1",
      title: "abdulla",
      cover_image:Image,
    },
    { id: "2", 
    title: "yaqwb" ,
    cover_image:Image2},

  ];

  return (
    <div className="book-card-list">
      {books.map((book) => (
     <BookCard key={book.id} title={book.title} cover_image={book.cover_image}/>
      ))}
    </div>
  );
}
