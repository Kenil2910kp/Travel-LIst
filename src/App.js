import { useState } from "react";

const initialItems = [
];



export default function App() {

  const[items,setItems]=useState(initialItems);

  function addhandleItem(i)
  {
      setItems((items)=>[...items,i]);
  }
  function handleDeleteItem(id){
    setItems((items)=>items.filter((item)=>item.id!==id));
  }

  function handleChange(id){
    setItems((items)=>items.map((item)=>{
      if(item.id===id){
        return{...item,packed:!item.packed};
      }
      return item;
    }));
  }

  return <div className="app">
    <Logo/>
    <Form SubmitItem={addhandleItem}/>
    <PackingList items={items} onDelete={handleDeleteItem} handleChange={handleChange} setItems={setItems} />
    <Stats items={items}/>
  </div>

}

function Logo(){
  return  <h1> 🏝️ Travel List 🧳</h1>   
}

function Form({SubmitItem}){
  const[description,setDescription]=useState("");
  const[quantity,setQuantity]=useState(1);
  const[items,setItems]=useState([]);

  function handleItem(i)
{
    setItems((items)=>[...items,i]);
}
  function handleSubmit(e){
     e.preventDefault();
     if(!description) return;

     const newItem={description,quantity,id:Date.now(),packed:false};
      console.log(newItem);

      SubmitItem(newItem);

      setDescription("");
      setQuantity(1);
  }


  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your 😍 trip?</h3>

    <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>

      {Array.from({length:20},(_,i)=>i+1).map((num)=>(
        <option value={num} key={num}>{num}</option>
      ))}

    </select>

    <input type="text" placeholder="Item...." value={description} onChange={(e)=>setDescription(e.target.value)} />

    <button>Add</button>

  </form>
}

function PackingList({items,onDelete,handleChange,setItems}){

  const [sortBy,setSortBy]=useState("input");

  let sortedItems;

  if(sortBy==="input"){
    sortedItems=items;
  }

  else if(sortBy==="description"){ 
    sortedItems=[...items].sort((a,b)=>a.description.localeCompare(b.description));
  }

  else if(sortBy==="packed"){
    sortedItems=[...items].sort((a,b)=>Number(a.packed)-Number(b.packed));
  }

  function clearItems(){
    const confirmed=window.confirm("Are you sure you want to clear the list?");
    if(confirmed){
      setItems([]);
    }
   }

  return <div className="list"> 
       <ul>
        {sortedItems.map((item)=>(
           <Items item={item}  onDelete={onDelete} key={item.id} handleChange={handleChange} />
        ))}
       </ul>

       <div className="actions">
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed Status</option>
        </select>
        <button onClick={clearItems}>Clear List</button>
       </div>  
   </div>
}

function Items({item,onDelete,handleChange}){
 
  return <li>
    <input type="checkbox" checked={item.packed} onChange={()=>handleChange(item.id)} />
    <span style={item.packed ? {textDecorationLine: "line-through"} : { }}>{item.quantity} {item.description}</span>
    <button onClick={()=>onDelete(item.id)}>❌</button>
    </li>
}

function Stats({items}){ 
  const packedItems=items.filter((item)=>item.packed).length;
  const percent=items.length===0 ? 0 : Math.round((packedItems/items.length)*100);
  return <footer className="stats">
    <em>🧳 You have {items.length} items on your list, and you already packed {packedItems} items ({percent}%)</em>
  </footer>
}
