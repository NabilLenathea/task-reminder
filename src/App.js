import { useState } from "react";

// static items

//parent component
export default function App() {
  //destructing array for states
  const [items, setItems] = useState([]);


  //handle add items to the states
  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  };


  // fungsi penghapusan item
  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  //render child components inside parent
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onRemoveItem={handleRemoveItem}/>
      <Stats />
    </div>
  );
}

// child component logo

function Logo() {
  return <h1>Jalan Kuy ✈️🚃 </h1>;
}

// child component form

function Form({ onAddItems }) {
  //destructing array for state
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState("1");

  //handle submission of from, by preventing its default behavior
  function handleSubmit(e) {
    e.preventDefault();

    // if empty description
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    // return this state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Apa yang dibawa 🙈</h3>
      <h3>Yuk checklist barang 🤓</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Barang yang mau dibawa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Bawa</button>
    </form>
  );
}

// child component PackingList

function PackingList({ items, onRemoveItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onRemoveItem={onRemoveItem}/>
        ))}
      </ul>
    </div>
  );
}

//sub-child component PackingList
function Item({ item, onRemoveItem }) {

  const handleRemoveClick = () => {
    onRemoveItem(item.id);
  }

  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button onClick={handleRemoveClick}>🙅🏻</button>
    </li>
  );
}

// child component stats

function Stats() {
  return (
    <footer className="stats">
      <em>
        👺 Kamu punya 0 barang di daftar, dan sudah packing 0 barang (0%){" "}
      </em>
    </footer>
  );
}
