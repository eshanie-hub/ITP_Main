import React, { useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        itemNo: "",
        itemName: "",
        color: "",
        size: "",
        price: "",
        stockCount: "",
        reorderPoint: ""
      })

      const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false);
    
      const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.itemNo.length < 4) {
          errors.itemNo = "itemNo is too short";
        }
        if (inputValues.itemName.length < 1) {
          errors.itemName = "itemName is too short";
        }
        if (inputValues.color.length < 1) {
          errors.color = "color is too short";
        }
        if (inputValues.size.length < 1) {
          errors.size = "size is too short";
        }
        if (inputValues.price.length < 1) {
          errors.price = "price is too short";
        }
        if (inputValues.stockCount.length < 1) {
          errors.stockCount = "stockCount is too short";
        }
        if (inputValues.reorderPoint.length < 1) {
          errors.reorderPoint = "reorderPoint is too short";
        }
        return errors;
      };

      const handleChange = (e) =>{
        setState({ ...state, [e.target.name]: e.target.value });
        setErrors(validateValues(state));
      }
      
      const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(validateValues(state));
        setSubmitting(true);

        if(Object.keys(errors).length === 0 && submitting){
          const 
        {
            itemNo, 
            itemName, 
            color,
            size,
            price,
            stockCount,
            reorderPoint
        } = state;
    
        const data = {
            itemNo: itemNo,
            itemName: itemName,
            color: color,
            size: size,
            price: price,
            stockCount: stockCount,
            reorderPoint: reorderPoint
        }
        console.log(data);

        axios.post("http://localhost:8000/inventory/add", data)
        .then((res) => {
          
          alert("Item added to inventory");
          navigate(-1);
        })
        }
        
      }

  return (
    <>
    <div class="col">
        <Header dashboard={"Inventory Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            <div class="mt-5 mb-5 ">
                <h4>
                    <span class="badge" style={{backgroundColor: "#596584 "}}>
                    Inventory Add 
                    </span>
                </h4>
            </div>
          
    {/* table */}
  <div>
  <div class="row mb-5">
    <div class="col">
        <label class="form-label">ItemNo</label>
        <input 
        type="text"
        name="itemNo" 
        className='form-control'
        placeholder="Enter itemNo of the post"
        value={state.itemNo}
        onChange={handleChange}
        />
        {errors.itemNo && (
          <div class="text-danger mt-2">
            ItemNo should have 4 characters
          </div>)}
    </div>

    <div class="col-6">
    <label class="form-label">ItemName</label>
        <input 
        type="text"
        name="itemName" 
        className='form-control'
        placeholder="Enter itemName of the post"
        value={state.itemName}
        onChange={handleChange}
        />
         {errors.itemName && (
          <div class="text-danger mt-2">
            ItemName can't be null
          </div>
          )}
    </div>
  </div>
  <div class="row mt-4">
  <div class="col">
    <label class="form-label">Color</label>
        <input 
        type="text"
        name="color" 
        className='form-control'
        placeholder="Enter color of the post"
        value={state.color}
        onChange={handleChange}
        />
         {errors.color && (
          <div class="text-danger mt-2">
            Color can't be null
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Size</label>
        <input 
        type="text"
        name="size" 
        className='form-control'
        placeholder="Enter size of the post"
        value={state.size}
        onChange={handleChange}
        />
         {errors.size && (
          <div class="text-danger mt-2">
            Size can't be null
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Price</label>
        <input 
        type="text"
        name="price" 
        className='form-control'
        placeholder="Enter price of the post"
        value={state.price}
        onChange={handleChange}
        />
         {errors.price && (
          <div class="text-danger mt-2">
            Price can't be null
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Stock Count</label>
        <input 
        type="text"
        name="stockCount" 
        className='form-control'
        placeholder="Enter stockCount of the post"
        value={state.stockCount}
        onChange={handleChange}
        />
         {errors.stockCount && (
          <div class="text-danger mt-2">
            StockCount can't be null
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Reorder Point</label>
        <input 
        type="text"
        name="reorderPoint" 
        className='form-control'
        placeholder="Enter reorderPoint of the post"
        value={state.reorderPoint}
        onChange={handleChange}
        />
         {errors.reorderPoint && (
          <div class="text-danger mt-2">
            reorderPoint can't be null
          </div>
          )}
    </div>

  <button className='btn mt-5' style={{backgroundColor: "#c1b688 "}} type='submit' onClick={handleSubmit}>
         Save
      </button>
      </div>
</div>

          </div>
      </div>
    </div>
  </>
  )
}

export default AddItem