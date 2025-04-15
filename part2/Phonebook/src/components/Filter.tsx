interface FilterProps {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ filter, setFilter }: FilterProps) => {
  return (
    <div>
      <input
        placeholder="Search"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
    </div>
  )
}

export default Filter
