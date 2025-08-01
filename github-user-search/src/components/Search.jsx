import { useState } from "react";

function Search({onSearch}) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
    // alert(`Submitted ${inputValue}`);
    setInputValue("");
  };
  return (
    <div>
      <h1>Simple Github Search Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search Github User"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Search;
