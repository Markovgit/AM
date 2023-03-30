const bar = document.getElementById('bar-menu');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


if(bar){
    bar.addEventListener('click',() =>{
    nav.classList.add('active');    

    })
}
if(close){
    close.addEventListener('click',() =>{
    nav.classList.remove('active');    

    })
}
/*
var MainImg = document.getElementById("MainImg");
        var smallImg = document.getElementsByClassName("small-img");

        smallImg[0].onclick = function(){
            MainImg.src = smallImg[0].src;
        }



       

 
        */


        let allTotal = 0 ;

function addToCart(element)
{

    let mainEl = element.closest('.single-item');
    let price = mainEl.querySelector('.price').innerText;
    let name = mainEl.querySelector('h3').innerText;
    let quantity = mainEl.querySelector('input').value;
    let cartItems = document.querySelector('.cart-items');

    

    if(parseInt(quantity) > 0){

       quantity= parseInt(quantity);

        price = price.substring(1);
        price = parseInt(price);

        let total = price * quantity; 
       
        allTotal += total;

        cartItems.innerHTML += `<div class = "cart-single-item">
  
                                   <h3>${name}</h3>
                                   <p>$${price} x ${quantity} = $<span>${total}</span> </p>
                                   <button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>            
                                 </div>` ; 


                                        
        document.querySelector('.total').innerText = `Total: $${allTotal} ` ;                          
        element.innerText = 'Dodato';
        element.setAttribute('disabled', 'true');




    }else {
        alert('Odaberite kolicinu')
    }
    
}



function removeFromCart(element)
{
let mainEl = element.closest('.cart-single-item');
let price = mainEl.querySelector('p span').innerText;
let name = mainEl.querySelector('h3').innerText;
let asortiman = document.querySelectorAll('.single-item');
price = parseInt(price);

allTotal -= price; 

document.querySelector('.total').innerText =`Total: $ ${allTotal}`;

mainEl.remove();


asortiman.forEach(function(balm)
{
    let itemName = balm.querySelector('.si-content h3'). innerText;
    if (itemName === name) {
        balm.querySelector('.actions input').value = 0;
        balm.querySelector('.actions button').removeAttribute('disabled');
        balm.querySelector('.actions button').innerText = 'Dodaj';
    }

})

}

// VALIDACIJA FORME -------------------------------------------------------------------------------------

let inputs = document.querySelectorAll('input');
let errors = {
    "ime_prezime": [],
    "korisnicko_ime": [],
    "email": [],
    "lozinka": [],
    "ponovi_lozinku": []
};

inputs.forEach(element => {
    element.addEventListener ('change', e => {
     let currentInput = e.target; 
     let inputValue = currentInput.value;
     let inputName = currentInput.getAttribute('name');


     if(inputValue.length > 4) {
        errors[inputName]=[];

        switch(inputName){
            case 'ime_prezime' :
                let validation = inputValue.trim();
                 validation = validation.split(" ");
                if(validation.length < 2 ){
                    errors[inputName].push('Morate napisati i ime i prezime poslije cemo vam traziti i krv jednoroga');

                }
                break;
               // console.log(validation)
               // case 'korisnicko_ime': 

               case 'email' : 
                   if(!validateEmail(inputValue)) {
                    errors[inputName].push('Neispravna email adresa (provjerite da li imate @ i tacku ).')
                   
                    
                   }
                   break;
/*
                  case 'lozinka' :
                    let loz = document.querySelector('input[name="lozinka"]').value;
                    if(inputValue !== loz){
                        console.log('NIJE TACNA ');
                        errors[inputName].push('Lozinka je nepotpuna');
                    
                    }
*/
                   case 'ponovi_lozinku':
                    let lozinka = document.querySelector('input[name="lozinka"]').value;
                    if(inputValue !== lozinka){
                        errors[inputName].push ('Lozinke se ne podudaraju');
                    } 
                    break;               
        }


     } else {
        errors[inputName]= ['Polje ne moze imati manje od pet znakova '];
     }

    
populateErrors();


   // document.querySelector('div').innerHTML = `<ul><li>${errors[inputName][0]}</li></ul>`;  MOZE TAKO A MOZE I FUNKCIJA U NASTAVKU UOPAAAAA 

    })

}); 

const populateErrors = () => {
    
    for(let element of document.querySelectorAll('ul')){
        element.remove();
    }

    for(let key of Object.keys(errors)){
        let input = document.querySelector(`input[name= "${key}"]`);
        let parentElement = input.parentElement;
        let errorsElement = document.createElement('ul');
        parentElement.appendChild(errorsElement);


        errors[key].forEach(error =>{
            let li = document.createElement('li')
            li.innerText = error;
            errorsElement.appendChild(li);

        });

    }


   

}



const validateEmail = email => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }

    return false;
}