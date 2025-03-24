const baseURL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");


window.addEventListener("load",()=>{
    updateExchangeRate();
});


for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerHTML=currCode;
        newOption.value=currCode;
        if(select.name === "From" && currCode === "USD")
        {
            newOption.selected = "selected";
        }else if (select.name === "To" && currCode === "INR")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});
}

const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let image = element.parentElement.querySelector("img");
  image.src = newSrc;
};


btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});


updateExchangeRate=async()=>{
    let amt=document.querySelector(".amount input");
    let amtVal=amt.value;
    if(amtVal==="" || amtVal<1){
      amtVal = 0;
      amt.value="0";
}


const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data [fromCurr.value.toLowerCase()] [toCurr.value.toLowerCase()];

let finalAmount = amtVal * rate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
