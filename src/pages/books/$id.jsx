
import {useLoaderData } from 'react-router-dom';
import { gettingBooks } from '../../api/DataFetcher/BookFetcher';

export const BookLoader=async({ params })=>{

  console.log(params.id)
  let bookData = {};
  try {
    bookData = await gettingBooks(
      `http://127.0.0.1:8000/api/books/${params.id}?page_size=10000`
    );
  } catch (err) {
    console.log(err);
  }

  return bookData;

}



const BookDetail = () => {
    const bookData=useLoaderData();

  
  return (
    <div className="book-detail">
    {bookData && (
      <div className="book-detail__container">
        <div className="book-detail__image">
          <img src={bookData.cover_image} alt="Book cover" />
        </div>
        <div className="book-detail__info">
          <h2 className="book-detail__title">{bookData.title}</h2>
          <p className="book-detail__author">Author: {bookData.author}</p>
          <p className="book-detail__publish-date">Publish Date: {bookData.publication_date}</p>
          {/* Add more information as needed */}
          <div>
            <button type='button'>Rent</button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default BookDetail
