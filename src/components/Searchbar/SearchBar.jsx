

export const SearchBar = () => {
  
  return (
<header >
  <form >
    <button type="submit">
      <span >Search</span>
    </button>

    <input
          type="text"
          name="query"
      autoComplete="off"
      autoFocus
          placeholder="Search images and photos"

    />
  </form>
</header>
  )
}

