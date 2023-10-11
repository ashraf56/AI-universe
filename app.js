
let AllDataLoad=()=>{
fetch(`https://openapi.programming-hero.com/api/ai/tools`)
.then(res=> res.json()).then(data=> CardData(data.data.tools.slice(0,6) ))

}
let displayAll=()=>{

  let url=`https://openapi.programming-hero.com/api/ai/tools`
  fetch(url).then(res=> res.json()).then(data=> CardData(data.data.tools ))
  
  }
  

let CardData =(data)=>{
let Cardcontainer=document.getElementById('card-container');

    let Shoallbutton=document.getElementById('ShowALL');
if (data.length >6) {  
  Cardcontainer.innerHTML='';
  Shoallbutton.style.display='none'
} else {

  Shoallbutton.style.display='block'

} 



data.forEach(tool => {
let {name,published_in,image,features,id}=tool
    Cardcontainer.innerHTML +=` 
    <div class="col">
      <div class="card h-100">
        <img src="${image}" class="img-fluid img-thumbnail " alt="...">
        <div class="card-body">
          <p class="card-text">
          <h6>Features</h6>
          <ul class="list-group list-group-numbered list-group-flush">
  <li class="list-group-item"> ${features[0]}</li>
  <li class="list-group-item"> ${features[1]}</li>
  <li class="list-group-item"> ${features[2]}</li>
 
</ul> </p>

<div class="card-footer d-flex justify-content-between">
<div>  
<h5 class="card-title">${name}</h5>
  <p class="card-text fw-semibold"><i class="fa-regular fa-calendar-days"></i> ${published_in} </p>
</div>
<div class="pt-4">
<button type="button" class="btn btn-light" onclick="ShowDetail('${id}')  "  data-bs-toggle="modal" data-bs-target="#AIModal"><i class="fa-solid fa-arrow-right"></i></button>

</div>
  
</div>
        </div>
      </div>
    </div>
    
    `

});

}


let ShowDetail=(id)=>{
let url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
fetch(url).then(res => res.json()) .then (data => ShowDetailModal(data.data))

}

let ShowDetailModal=(data)=>{

let{tool_name,description,features,image_link,integrations,pricing,input_output_examples,accuracy,logo,website}=data;
let accuracy1=Math.abs(accuracy.score*100)+`% accuracy`;


document.getElementById('AIModalLabel').innerText=tool_name;
let aiModal=document.getElementById('AImodal-body');
aiModal.innerHTML='';
aiModal.innerHTML +=`
<div class="row">
  <div class="col-md-6">
  <section  class="w-100 h-100">
  <div class="card border-danger h-100" >
    <div class="card-body">
  
      <h5 class="card-text fw-bold p-4">${description}</h5>
      <p class="card-text fw-semibold ">${website?`website: `+ website:'not available'}</p>



<div class="container">
<div class="row">
  <div class="col">
    <div class="card text-center bg-success bg-opacity-25 h-100 py-2 px-2 fw-semibold">
    <a> ${pricing ?  pricing[0].price:'Free of Cost'}    </a>
    <a> ${pricing? pricing[0].plan:''}   </a>
    </div>
  </div>
  <div class="col">
    <div class="card text-center bg-info bg-opacity-25 py-2   fw-semibold h-100  ">
    <a> ${pricing ? pricing[1].price:'Free of Cost'}    </a>
    <a> ${pricing? pricing[1].plan:''}   </a>
    </div>
  </div>
  <div class="col">
    <div class="card h-100 bg-warning bg-opacity-25 fw-semibold  py-2  text-center" style="font-size:14px;">
    <a> ${pricing ? pricing[2].price:'Free of Cost'}    </a>
    <a> ${pricing? pricing[2].plan:''}   </a>
    
 
  </div>
</div>
</div>

<div class="container my-3 ">
<div class="row">
  <div class="col w-100">
    <div >
<p class=" fw-bold fs-5">Feature</p>
      <ul class="list-group list-group-flush fw-bold"  style="font-size:14px">
        
        <li class="list-item">${features[1].feature_name}</li>
        <li class="list-item">${features[2].feature_name}</li>
        <li class="list-item">${features[3].feature_name}</li>
      </ul>
      
      </div>
  </div>
  <div class="col w-100">
    <div id="Integrations">
    <p class=" fw-bold fs-5">Integrations</p>
      <ul class="list-group  list-group-flush  fw-bold" style="font-size:14px ; list-style-type:none;">
        
        <li class="list-item">${ integrations === null || typeof integrations[0] === 'undefined' ? 'Nodata found': `.`+integrations[0] }  
       
        </li>
        <li class="list-item">${ integrations === null || typeof integrations[1] === 'undefined' ? '': `.`+integrations[1] }   
       
        </li>
        <li class="list-item">${ integrations === null || typeof integrations[2] === 'undefined' ? '':`.`+ integrations[2]  }  
        </li>
      </ul>
      </div>
  </div>

</div>
</div>
</div>
</div>
</section>
  
  
  </div>
  <div class="col-md-6">
  
  <section class="w-100 h-100">
  <div class="card h-100" >
<div class="position-relative">
<a  class="btn btn-danger position-absolute top-0 end-0 mt-2 me-2 rounded-5   ${accuracy.score ? 'd-block':'d-none'}"  style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
${accuracy1? accuracy1:''}
</a>

<figure class="figure">
<img src="${image_link[0]}" class="img-fluid img-thumbnail " alt="...">

</figure>


</div>
    
    <div class="card-body text-center ">
      <h5 class="card-title">${input_output_examples? input_output_examples[0].input:'Can you give any example?'}</h5>
      <p class="card-text">${input_output_examples?input_output_examples[1].output:'No! Not Yet! Take a break!!!'}</p>
    </div>
  </div>
</section>

  
  
  </div>
</div>




`

}


//spinner 
    const Spinner = document.getElementById('spin');
   Spinner.style.display = 'block';
 window.onload = function() {
      Spinner.style.display = 'none';
    };


AllDataLoad();