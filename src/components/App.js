import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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


