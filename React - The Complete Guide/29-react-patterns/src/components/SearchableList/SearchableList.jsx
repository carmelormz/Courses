import { useRef, useState } from 'react';

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChangeRef = useRef();

  const [searchTerm, setSearchTerm] = useState('');

  const searchResult = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    if (lastChangeRef.current) {
      clearTimeout(lastChangeRef.current);
    }

    lastChangeRef.current = setTimeout(() => {
      lastChangeRef.current = null;
      setSearchTerm(e.target.value);
    }, 500);
  };

  return (
    <div className='searchable-list'>
      <input type='search' placeholder='Search...' onChange={handleChange} />
      <ul>
        {searchResult.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
