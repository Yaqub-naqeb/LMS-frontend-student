import BookCard from "../../components/buttons/cards/BookCard";
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";
import {
  Link,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { useCallback, useState } from "react";
import Pagination from "../../components/buttons/Pagination";

export const booksLoader = async ({ request }) => {
  const url = new URL(request.url);
  const searchValue = url.searchParams.get("searchValue");
  let currentPage = url.searchParams.get("page");

  let booksData = {};
  try {
    booksData = await gettingBooks(
      `http://127.0.0.1:8000/api/books/?title=${
        searchValue
          ? searchValue
          : `&page_size=2&page=${currentPage ? currentPage : 1}`
      }`
    );
  } catch (err) {
    console.log(err);
  }

  return booksData;
};

export default function Books() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchValue") || ""
  );

  const booksData = useLoaderData();
  const totalBooks = booksData.count;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalBooks / 2); // 10 books per page
  const handlePageClick = (number) => {
    setCurrentPage(number);
  };

  const handleSearchClick = useCallback(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("searchValue", searchValue);
    setSearchParams(updatedSearchParams);
  }, [searchParams, setSearchParams, searchValue]);

  const handleSearchValue = useCallback(
    (e) => {
      setSearchValue(e.target.value);

      if (!e.target.value) {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.delete("searchvalue");
        setSearchParams(updatedSearchParams);
      }
    },
    [setSearchParams, searchParams]
  );

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchValue}
          className="search__input"
        />
        <button
          type="button"
          className="search__button"
          onClick={handleSearchClick}
        >
          search
        </button>
      </div>
      <div className="book-card-list">
        {booksData?.results?.map((book) => (
          <Link key={book.id} to={`http://localhost:5173/books/${book.id}`}>
            {" "}
            <BookCard title={book.title} cover_image={book.cover_image} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}
