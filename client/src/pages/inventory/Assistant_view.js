import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios'

const Assistant_view = () => {
    const [state, setState] = useState({
        inventory: []
    })

    //message
    const message = state.inventory.map((data, index) => {
      if(data.stockCount < data.reorderPoint ){ 
        return (
          <div class="alert alert-warning mb-5" role="alert">
            <span>item name:<b>{(index ? ', ' : '') + data.itemName}</b> is stockcount is low!</span>
          </div>
        )
        
      }
      return null;
    })

    

    useEffect(() => {
        axios.get("http://localhost:8000/inventory/").then(res =>{
            if(res.data){
              setState({
                inventory:res.data
              })
            }
          })
        }, [state]);
      
        const onDelete = (id) => {
          axios.delete(`http://localhost:8000/inventory/delete/${id}`)
          .then((res) => {
            alert("Deleted successfully");
            
          })
        }

        const [search, setSearch] = useState("");
        // console.log(search);
        
  return (
    <>
      <div class="col">
          <Header dashboard={"Inventory Management System"} setSearch={setSearch} />
      </div>
      <div class="container-fluid pt-5">
        <div class="row flex-nowrap">
          <div class="col py-3">
          
          {message}
            
            

            {/* details */}
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Item No</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Color</th>
                    <th scope="col">Size</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock Count</th>
                    <th scope="col">Reorder Point</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                {state.inventory.filter((inventory) => {
                  return search.toLowerCase()===''
                  ? inventory
                  : inventory.itemName.toLowerCase().includes(search);
                })
                
                .map((inventory, index) => (
                    <tr key={index}>
                    <td>{inventory.itemNo}</td>
                    <td>{inventory.itemName}</td>
                    <td>{inventory.color}</td>
                    <td>{inventory.size}</td>
                    <td>{inventory.price}</td>
                    <td>{inventory.stockCount}</td>
                    <td>{inventory.reorderPoint}</td>
                    <td>
                    <div class="d-grid gap-2" >
                    <button type="button" class="btn btn-sm"  style={{backgroundColor: "#596584 "}} >
                        <a href={`/pages/inventory/edit/${inventory._id}`} style={{textDecoration: 'none', color:'white'}}>
                            update
                        </a>
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick={() => onDelete(inventory._id)}>Delete</button>
                    </div>
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>

                <button className='btn' style={{backgroundColor: "#c1b688 "}}>
                <a href="/pages/inventory/add" style={{textDecoration: 'none', color:'black'}}>
                    create new Item
                </a>
            </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Assistant_view