import { useState } from "react";

// Komponen utama
export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onUpdateItem={handleUpdateItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>📅 Pengingat Tugas 📌</h1>;
}

// Komponen Form
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Tidak");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
      dueDate,
      priority,
    };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
    setDueDate("");
    setPriority("Tidak");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>daftar daftar tugasmu 🤓💕 </h3>

      <input
        type="text"
        placeholder="Tugas yang perlu diingatkan"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Ya">Ya</option>
        <option value="Tidak">Tidak</option>
      </select>
      <button>Buat Pengingat</button>
    </form>
  );
}

// Komponen PackingList
function PackingList({ items, onRemoveItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onUpdateItem }) {
  const handleRemoveClick = () => {
    onRemoveItem(item.id);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}, tgl dibuat : {item.dueDate} / Priotias :{" "}
        {item.priority}
      </span>
      <button onClick={handleRemoveClick}>💥</button>
    </li>
  );
}

// Komponen Stats
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Tambahkan Tugas Anda bub 👯👯</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Semua tugas selesai! ✅"
          : `😜 Kamu punya ${numItems} tugas di daftar, dan sudah selesai ${numPacked}
        tugas (${percentage}%)`}
      </em>
    </footer>
  );
}
