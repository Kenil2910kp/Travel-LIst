
export default function Items({ item, onDelete, handleChange }) {

  return <li>
    <input type="checkbox" checked={item.packed} onChange={() => handleChange(item.id)} />
    <span style={item.packed ? { textDecorationLine: "line-through" } : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => onDelete(item.id)}>❌</button>
  </li>;
}
