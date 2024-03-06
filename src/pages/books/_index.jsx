import BookCard from "../../components/buttons/cards/BookCard";
import Image from '../../assets/KoyaUni.png'
import Image2 from '../../assets/download.jpeg'
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";
import { Link, useLoaderData } from "react-router-dom";


export const booksLoader = async ({ request }) => {
   
    let booksData = {};
    try {
      booksData = await gettingBooks(
        "http://127.0.0.1:8000/api/books/?page_size=10000"
      );
    } catch (err) {
      console.log(err);
    }
  
    return booksData;
  };






export default function Books() {

  const booksData =useLoaderData();
  console.log(booksData)

  return (
    <div className="book-card-list">
      {booksData?.results?.map((book) => (
    <Link key={book.id}  to={`http://localhost:5173/books/${book.id}`}> <BookCard title={book.title} cover_image={book.cover_image} /></Link>
      ))}
    </div>
  );
}
