import BookCard from "../../components/buttons/cards/BookCard";
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";

export const booksLoader = async ({ request }) => {
  const url = new URL(request.url);
  const searchValue = url.searchParams.get("searchValue");

  let booksData = {};
  try {
    booksData = await gettingBooks(
      `http://127.0.0.1:8000/api/books/?title=${searchValue?searchValue:''}&page_size=1000`
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

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };
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
        <button type="button" className="search__button" onClick={handleSearchClick}>
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
    </div>
  );
}
