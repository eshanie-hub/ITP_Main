import React from 'react'


const Home = () => {
  return (
    <div>
      <div>
      <img src={require("../assets/hero.png")} height={680} width="100%" alt="s" class="mb-5"/>

      <h2 class="my-5 text-center">About Vidma Engineering</h2>
      <div class="row mx-5">
        <div class="col-5">
        <img src={require("../assets/about.png")} width="100%" alt="s" class="mb-5"/>
        </div>
        <div class="col-7 px-5">
          <div class="mx-5">
            <p class="my-5">Starting in 2007 by fabricating steel, we’ve come a long way of successful 12 years, developing our products 
            in our expertized field. Researching into quality materials available in the international market, and the 
            up-to date technologies of international standards of manufacturing steel, we’ve expanded further by starting 
            manufacturing Gutters in 2011 with high quality materials especially imported from South Korea, Vietnam and China.</p>

            <p>2016 marked a milestone as the year we commenced producing roofing materials, which now with the professionalism 
              of our staff and the expertise in the workforce, has grown to the heights of producing 20,000 daily capacities 
              of linear feet for gutters, more than 30,000 linear feet for tile roofing, roofing and cladding in meeting high end 
              customer expectations. Currently, we facilitate for our customers under 3 trade names: Super Shine, Vidma Super and 
              Union Steel Vidma with the vision to grow further.</p>
          </div>
        </div>
      
      </div>

      <div class=""  style={{backgroundColor: "#596584"}}>
        <h3 class="text-center py-5 text-light">Testimony</h3>

        <div class="pb-5">
        <div id="carouselExampleDark" class="carousel carousel-dark slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

  <div class="carousel-inner">

  <div class="carousel-item active">


          <div class="card mx-auto" style={{width: "1200px", height: "300px"}}>
            <div class="row g-0">
            <div class="card-body col-md-8">
            
            <p class="card-text">
"A big Thank you" for all your assistance over the last few years. The trading partnership we have been building up over all the projects with Vidma Engineering providing is strengthened with the way they kept contacts with us to keep check on the quality of their products and our further requirements. Thank you for the super-fast responses and transportation services at quick notice. 
The cost and time effective methods and the code of ethics followed by the company are unique and highly impressive.<br class="mb-3"/>
Obviously it is natural to be skeptical about anything you purchase for the first time for your treasured projects. Yet, Vidma Engineering never missed to satisfy and address all the requirements with further suggestions to enhance the quality and the completion of the projects. Hoping to continue this long lasting partnership with Vidma Engineering."</p>
</div>
            <div class="col-md-4 py-4  px-5">
              <img src={require("../assets/bg.jpg")} class="img-fluid  rounded" height="500px" alt="..."/>
              <h5 class="card-title pt-3">Mr.Gamunu Kotuwegedara</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">MKG Construction</h6>
            </div>

</div>
</div>
        </div>

        <div class="carousel-item">


        <div class="card mx-auto" style={{width: "1200px", height: "300px"}}>
            <div class="row g-0">
            <div class="card-body col-md-8">
            
            <p class="card-text">
"With no specific idea of a roofing company, I however halted at the edge of Vidma Super Engineering hotline. Which now, I think as one of the best choices I've made in my life in sourcing quality and genuine products. With their super friendly and flexible customer care, they knew exactly what quality and quantity I was looking for. The quality of the construction was complemented with the selection of the most suited roofing and its installment.
<br class="mb-3"/>
The staff is friendly and very accommodating to question. In selection of the materials, their assistance of consolatory made the selection easier in turning the end look of the construction match perfection. I recommend Vidma Engineering over any other roofing solution provider if you are looking for both genuine products and high quality service."</p>
</div>
  <div class="col-md-4 py-4  px-5">
    <img src={require("../assets/bg.jpg")} class="img-fluid rounded" height="500px" alt="..."/>
    <h5 class="card-title pt-3">Mr. M. N. Damrmasena</h5>
<h6 class="card-subtitle mb-2 text-body-secondary">Metal Roof Trading</h6>
  </div>
 
</div>
</div>
</div>

<div class="carousel-item">


        <div class="card mx-auto" style={{width: "1200px", height: "300px"}}>
            <div class="row g-0">
            <div class="card-body col-md-8">
            
            <p class="card-text">
"Being disappointed on the product quality of my previous purchasing in another company, I was very keen on the details in purchasing the products from Vidma Engineering. The accessories in bulk purchasing usually tend to have few with damages when unchecked. But with Vidma Engineering, for my surprise, nothing of that sort happened. The team was more than helpful for me in selecting and suggesting the most appropriate products.
<br class="mb-3"/>
There is a huge fundamental difference between Vidma engineering and other roofing companies in Sri Lanka, talking with experience. The previous process of dealing was too complicated and I had to be alert on the installment whereas in this case, the team was excited to get the project perfectly spot on without any inconvenience caused in the process even without my presence on the site."</p>
</div>
  <div class="col-md-4 py-4  px-5">
    <img src={require("../assets/bg.jpg")} class="img-fluid rounded" height="500px" alt="..."/>
    <h5 class="card-title pt-3">Mr Pathmasiri</h5>
<h6 class="card-subtitle mb-2 text-body-secondary">Boralesgamuwa Industries</h6>
  </div>
 
</div>
</div>
</div>

      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>


      </div>
      
    </div>
    </div>
    
    
    
    
    
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

export default Home