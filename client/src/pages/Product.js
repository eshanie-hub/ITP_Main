import React from 'react'
import NavBar from '../component/NavBar'

const Demo = ({title, image, item1, item2, item3, color1, color2, color3, color4, colorSub1, colorSub2, colorSub3, colorSub4}) => {
  return(
    <div class="card" style={{width: "18rem"}}>
  <img src={image} class="card mt-3"  alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
  <h6><span class="badge rounded-pill text-bg-secondary">Material specifications</span></h6>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{item1}</li>
    <li class="list-group-item">{item2}</li>
    <li class="list-group-item">{item3}</li>
  </ul>
  <span class="card-body"><b>Colours</b></span>
  <div class="row pb-4 px-3">
    <div class="col" title={colorSub1}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={color1} class="bi bi-circle-fill" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8"/>
      </svg>
    </div>
    <div class="col" title={colorSub2}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={color2} class="bi bi-circle-fill" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8"/>
      </svg>
    </div>
    <div class="col" title={colorSub3}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={color3} class="bi bi-circle-fill" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8"/>
      </svg>
    </div>
    <div class="col" title={colorSub4}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={color4} class="bi bi-circle-fill" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8"/>
      </svg>
    </div>
  </div>
</div>
  )
}

const Product = () => {
  return (
    <div>
      <h2 class="my-5 text-center pb-5">Our production portfolio</h2>
      <div class="row justify-content-center gap-5 pb-4">
       <Demo 
          image={require("../assets/product1.png")}  title="Curved Roof" item1="Finish product width 762mm" item2="Tensile Strength Law Tensile" 
          item3="Thicknes : 0.47mm ,0.40mm, 035mm, 030mm" color1="#702822"  color2="#013220" color3="#32527b" color4="#007094" colorSub1="Auburn"
          colorSub2="Raw Umber" colorSub3="St Tropaz" colorSub4="Cerulean"
        />
        <Demo 
          image={require("../assets/product2.png")}  title="Canopy Roof" item1="Finish product width 762mm" item2="Tensile Strength Law Tensile" 
          item3="Finish product Lenth any size from threefeet" color1="#800000"  color2="#eae0c8" color3="#6e7b5d" color4="#a0a0a0" colorSub1="Maroon"
          colorSub2="Pearl Lusta" colorSub3="Willow Grove" colorSub4="Nobel"
        />

        <Demo 
          image={require("../assets/product3.png")}  title="Gutter" item1="Finish product width Lenth 13′ or 10′" item2="Colour Coating AZ 150" 
          item3="Tensile Strength Law Tensile" color1="#663900"  color2="#013220" color3="#6e7b5d" color4="#000000" colorSub1="Raw Umber"
          colorSub2="Dark Green" colorSub3="Willow Grove" colorSub4="Black"
        />

        <Demo 
          image={require("../assets/product4.png")}  title="Roofing Sheet" item1="Finish product width 762mm" item2="Finish product Lenth any size from two feet" 
          item3="Tensile Strength Law Tensile." color1="#800000"  color2="#eae0c8" color3="#6e7b5d" color4="#a0a0a0" colorSub1="Maroon"
          colorSub2="Pearl Lusta" colorSub3="Willow Grove" colorSub4="Nobel"
        />  
      </div>
      <div class="row justify-content-center gap-5 mt-5">
       <Demo 
          image={require("../assets/product5.png")}  title="Title Roofing" item1="Finish product width 736mm" item2="Finish product Lenth any size from Three feet" 
          item3="Tensile Strength Law Tensile." color1="#702822"  color2="#013220" color3="#32527b" color4="#007094" colorSub1="Auburn"
          colorSub2="Raw Umber" colorSub3="St Tropaz" colorSub4="Cerulean"
        />
        <Demo 
          image={require("../assets/product6.png")}  title="Wall Cladding" item1="Finish product width 762mm" item2="Finish product Lenth any size from two feet" 
          item3="Tensile Strength Law Tensile" color1="#800000"  color2="#eae0c8" color3="#6e7b5d" color4="#a0a0a0" colorSub1="Maroon"
          colorSub2="Pearl Lusta" colorSub3="Willow Grove" colorSub4="Nobel"
        />

        <Demo 
          image={require("../assets/product7.png")}  title="Gate Cladding" item1="Finish product width 762mm" item2="Finish product Lenth any size from two feet" 
          item3="Tensile Strength Law Tensile" color1="#800000"  color2="#eae0c8" color3="#6e7b5d" color4="#a0a0a0" colorSub1="Maroon"
          colorSub2="Pearl Lusta" colorSub3="Willow Grove" colorSub4="Nobel"
        />

        <Demo 
          image={require("../assets/product8.png")}  title="Zinc Aluminium Sheet" item1="Finish product width 914mm" item2="Avalable in defferent lenghts and widths" 
          item3="Tensile Strength Law Tensile" color1="#800000"  color2="#eae0c8" color3="#6e7b5d" color4="#a0a0a0" colorSub1="Maroon"
          colorSub2="Pearl Lusta" colorSub3="Willow Grove" colorSub4="Nobel"
        />  
      </div>
      <div
          className="row mt-5 mb-5 mx-5 align-self-center"
          style={{
            top: "100px",
            backgroundColor: "#c1b688",
            borderRadius: "20px",
          }}>
          <div className="row  p-3  mx-5">
            <div className="col">
              <h5>CALL US</h5>
              <p>+94 764 409 693</p>
            </div>
            <div className="col">
              <h5>LOCATION</h5>
              <p>No 190/1,Werahara,Boralesgamuwa.</p>
            </div>
            <div className="col">
              <h5>Email</h5>
              <p>info@vidmaengineer.com</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Product