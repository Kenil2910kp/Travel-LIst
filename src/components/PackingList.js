import { useState } from "react";
import Items  from "./Items";

export default function PackingList({ items, onDelete, handleChange, setItems }) {

  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  else if (sortBy === "description") {
    sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
  }

  else if (sortBy === "packed") {
    sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  function clearItems() {
    const confirmed = window.confirm("Are you sure you want to clear the list?");
    if (confirmed) {
      setItems([]);
    }
  }

  return <div className="list">
    <ul>
      {sortedItems.map((item) => (
        <Items item={item} onDelete={onDelete} key={item.id} handleChange={handleChange} />
      ))}
    </ul>

    <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort By Input Order</option>
        <option value="description">Sort By Description</option>
        <option value="packed">Sort By Packed Status</option>
      </select>
      <button onClick={clearItems}>Clear List</button>
    </div>
  </div>;
}
