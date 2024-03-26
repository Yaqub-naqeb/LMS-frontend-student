import BookCard from "../../components/buttons/cards/BookCard";
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";
import Pagination from "../../components/buttons/Pagination";

export const booksLoader = async ({ request }) => {
  const url = new URL(request.url);
  const searchValue = url.searchParams.get("searchValue");
  let currentPage = url.searchParams.get("page");
  const searchBy = url.searchParams.get("searchBy");
  const booking = url.searchParams.get("booking");
  const genre=url.searchParams.get("genre");
 

  let booksData = {};
  try {
    booksData = await gettingBooks(
      `http://127.0.0.1:8000/api/books/?${searchBy ? searchBy : "?"}=${
          searchValue
          ? searchValue
          : `&page_size=8&page=${currentPage ? currentPage : 1}&is_booked=${booking}&genre=${genre?genre:''}`}`
    );
  
  } catch (err) {
    console.log(err);
  }

  return booksData;
};

export default function Books() {

  const booksData = useLoaderData();
console.log(booksData)


  let [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchValue") || ""
  );
 


  const totalBooks = booksData.count;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBy, setSearchBy] = useState(searchParams.get("searchBy")||"title");
  const [booked, SetBooked] = useState(searchParams.get('booking')||"");
  const [genreOption, setGenreOption] = useState(searchParams.get("genre")||"");
  const totalPages = Math.ceil(totalBooks / 8); // 10 books per page
  const handlePageClick = (number) => {
    setCurrentPage(number);
  };

  const handleSearchClick = useCallback(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("searchBy", searchBy);
    updatedSearchParams.set("searchValue", searchValue);
    updatedSearchParams.set("booking", booked);
    setSearchParams(updatedSearchParams);
  }, [searchParams, setSearchParams, searchValue, searchBy, booked]);

  const handleSearchValue = useCallback(
    (e) => {
      setSearchValue(e.target.value);

      if (!e.target.value) {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.delete("searchBy");
        updatedSearchParams.delete("searchValue");
        updatedSearchParams.delete("booking");
        setSearchParams(updatedSearchParams);
      }
    },
    [setSearchParams, searchParams]
  );

  const options = [
    { value: "title", label: "Title" },
    { value: "author", label: "Author" },
    { value: "dewey_decimal", label: "Dewey decimal" },
  ];

  const isBooked = [
    { value: "", label: "None" },
    { value: "true", label: "Booked" },
    { value: "false", label: "Not booked" },
  ];
  const genreOptions = [
    { id: 1, name: "Science" },
    { id: 2, name: "Law" },
    { id: 3, name: "Medicine" },
    { id: 4, name: "Mathematics" },
    { id: 5, name: "History" },
    { id: 6, name: "Literature" },
    { id: 7, name: "Engineering" },
    { id: 8, name: "Computer Science" },
    { id: 9, name: "Psychology" },
    { id: 10, name: "Economics" },
  ];


  const handleSearchOptions = useCallback(
    (option) => {
      setSearchBy(option.target.value);
    },
    [setSearchBy]
  );
  const handleIsBookedOptions = useCallback(
    (option) => {
      SetBooked(option.target.value);
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("booking", option.target.value);
      setSearchParams(updatedSearchParams);



    },
    [searchParams,setSearchParams]
  );


  const handleGenreOption = useCallback(
    (e) => {
      setGenreOption(e.target.value);
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("genre", e.target.value);
      setSearchParams(updatedSearchParams);
    },
    [setSearchParams, setGenreOption, searchParams]
  );





  return (
    <div>
      <div>
        <div className="search">
          <div className="searchBy">
            <label htmlFor="selectInput">Search By </label>
            <select
              id="selectInput"
              value={searchBy}
              defaultValue={searchBy}
              onChange={handleSearchOptions}
            >
              {/* <option value="">--Please choose an option--</option> */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* search */}
          <div>
            {" "}
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
        </div>

        <div className="isBooked searchBy">
          <div>
          <label htmlFor="selectInput">Filtters</label>
          <select
            id="selectInput"
            value={booked}
            defaultValue={booked}
            onChange={handleIsBookedOptions}
          >
            {/* <option value="">--Please choose an option--</option> */}
            {isBooked.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>



{/* genere */}
        <div>
          <select
            id="selectInput"
            value={genreOption}
            defaultValue={genreOption}
            onChange={handleGenreOption}
          >
            {genreOptions.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>


          </div>

         
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
