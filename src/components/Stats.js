export default function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed).length;
  const percent = items.length === 0 ? 0 : Math.round((packedItems / items.length) * 100);
  return <footer className="stats">
    <em>🧳 You have {items.length} items on your list, and you already packed {packedItems} items ({percent}%)</em>
  </footer>;
}
