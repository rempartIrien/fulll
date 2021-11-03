import { useMemo, useState } from 'react';

function App(): JSX.Element {
  const [states, setStates] = useState([...Array(4)].map(() => false));
  const areAllSelected: boolean = useMemo(
    () => states.every((state) => state),
    [states]
  );

  function toggleCheckbox(index: number): void {
    const newValue: boolean = !states[index];
    const newValues: boolean[] = [
      ...states.slice(0, index),
      newValue,
      ...states.slice(index + 1)
    ];
    setStates(newValues);
  }

  function toggleAll(): void {
    const selectAllValue: boolean = !areAllSelected;
    setStates(states.map(() => selectAllValue));
  }

  return (
    <form>
      <p>
        <label>
          <input
            type="checkbox"
            checked={areAllSelected}
            onChange={toggleAll}
          />
          {areAllSelected ? 'Unselect all' : 'Select all'}
        </label>
      </p>
      <ol>
        {states.map((state, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={state}
                onChange={() => toggleCheckbox(index)}
              />
              Item {index + 1}
            </label>
          </li>
        ))}
      </ol>
    </form>
  );
}

export default App;
