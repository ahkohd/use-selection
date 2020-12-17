import React, { FC, RefObject, useState } from 'react';

import useSelection from 'use-selection';

const App: FC = () => {
  const [people] = useState([
    {
      name: 'John Doe',
      age: 20
    },
    {
      name: 'Jane Doe',
      age: 18
    },
    {
      name: 'Jannet Doe',
      age: 25
    },
    {
      name: 'Jackson Doe',
      age: 10
    },
    {
      name: 'Jake Doe',
      age: 40
    }
  ]);

  const {
    itemsListContainerRef,
    selectedItems,
    handleToggleSelect,
    handleToggleSelectAll
  } = useSelection();

  return (
    <>
      You selected: {selectedItems.length} people.
      <ul ref={itemsListContainerRef as RefObject<HTMLUListElement>}>
        <li>
          <label htmlFor='selectAll'>Toggle select all people:</label>
          <input
            type='checkbox'
            id='selectAll'
            checked={selectedItems.length === people.length}
            onChange={(event) => handleToggleSelectAll(event, people.length)}
          />
        </li>

        {people.map((person, index) => (
          <li key={index}>
            <input
              type='checkbox'
              onChange={(event) => handleToggleSelect(event, index)}
            />

            <span>
              Name: {person.name}
              Age: {person.age}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
