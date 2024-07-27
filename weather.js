
const search = document.querySelector("button");
const searchInput = document.querySelector("input");
const temperature = document.querySelector(".temperature");
const place = document.querySelector(".place");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const image = document.querySelector("img");
const weatherName = document.querySelector(".weathericon");

search.addEventListener("click", Searcher);


async function Searcher(){
    if(searchInput.value!==""){
        await apiSearch(searchInput.value);
        searchInput.value="";
    }
    else{
        alert("please enter a location");
    }
}

async function apiSearch(LOCATION){
    const url=`http://api.weatherapi.com/v1/current.json?key=1394d69dd6fc4985913120416242707&q=${LOCATION}&aqi=no`;
    const response=await fetch(url);
    if(response.status===404){
        alert("Enter a valid location ");

    }
    else if(response.status===200){
        const data=await response.json();
        console.log(data);
        updateDom(data);
    }
    else{
        alert("Bad response");
    }
}
async function updateDom(weatherdata){

     temperature.innerText=`${weatherdata.current.temp_c} C`;
     place.innerText=weatherdata.location.name;
     const timedatearray=weatherdata.location.localtime.split(" ");
     time.innerText=timedatearray[1];
     date.innerText=timedatearray[0];
     image.src=weatherdata.current.condition.icon;
     weatherName.innerText=weatherdata.current.condition.text;


}

