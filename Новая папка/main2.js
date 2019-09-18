
/* funkcja pobierająca dzisiejsza datę */ 
function getDataToday() {
const dataToDay = new Date()

const year = dataToDay.getFullYear();
const month = dataToDay.getMonth() + 1 
const day = dataToDay.getDate()
const spanData = document.getElementById('dataKursu')
const h = dataToDay.getHours()
let min = dataToDay.getMinutes()
let sec = dataToDay.getSeconds()

if(sec < 10) {
    sec = "0" + sec
} 

if(min < 10) {
    min = "0" + min
}




spanData.innerHTML = day + '/' + month + '/' + year + " godzina " + h +" : " + min + " : " + sec


}


/* funkcja pobierająca dzisiejsza datę */ 

setInterval(getDataToday, 1000)

getDataToday()

let waluta = ''
let topCount = ''

/* ----wybrany checbox z tabelami -------- */
let inputCheckboxesContentValue = ''
/* ----wybrany checbox z tabelami -------- */


/* funkacja pobierająca value z checkbox z tabelami */ 
function getInput () {
    const inputCheckboxesContent = document.getElementsByName('tabela')
    
 for(let i =0; i< inputCheckboxesContent.length; i++) {
     
    if(inputCheckboxesContent[i].checked === true) {
        inputCheckboxesContentValue  = inputCheckboxesContent[i].value
    }
 }
}
/* funkacja pobierająca value z checkbox z tabelami */ 


function getTable () {

    getInput()
 
 fetch(`http://api.nbp.pl/api/exchangerates/tables/${inputCheckboxesContentValue}/?format=json`)
 .then(tabelaNbp => tabelaNbp.json())
 .then(tabelaNbp => {
    // console.log(tabelaNbp[0].rates)
    const elementApp = document.getElementById('app')
    elementApp.innerHTML = ''
    for(let i =0; i < tabelaNbp[0].rates.length; i++ ) {
    
        let divClassCard = document.createElement('div')
        divClassCard.classList.add('card')
        let divCardBody = document.createElement('div')
        divCardBody.classList.add('card-body')

        /* created h5 */
        let elementH5 = document.createElement('h5');
        elementH5.classList.add('card-title');
        let elementH5Text = document.createTextNode(tabelaNbp[0].rates[i].currency);
        elementH5.appendChild(elementH5Text);
        console.log(elementH5);
        divCardBody.appendChild(elementH5);

        /* ele p */
        var elementPFirst = document.createElement('p');
        elementPFirst.classList.add('card-text');
        var elementPFirstText = document.createTextNode(tabelaNbp[0].rates[i].code);
        elementPFirst.appendChild(elementPFirstText);
        divCardBody.appendChild(elementPFirst);



        /* ele p 2 */ 

        if(inputCheckboxesContentValue == 'c') {

            let elementPSecond = document.createElement('p');
            elementPSecond.classList.add('card-text');
            let elementPSecondText = document.createTextNode(tabelaNbp[0].rates[i].bid + " end " + tabelaNbp[0].rates[i].ask );
            elementPSecond.appendChild(elementPSecondText) ;
            divCardBody.appendChild(elementPSecond);
        }
        else {
            let elementPSecond = document.createElement('p');
            elementPSecond.classList.add('card-text');
            let elementPSecondText = document.createTextNode(tabelaNbp[0].rates[i].mid);
            elementPSecond.appendChild(elementPSecondText) ;
            divCardBody.appendChild(elementPSecond);

        }
       



        divClassCard.appendChild(divCardBody)
       /* dodawanie całej carty do elelntu o id = app */

        elementApp.appendChild(divClassCard)
        

        
    }
 })

}

/* czyście tabele */
function clear() {
    const elementApp = document.getElementById('app')
    elementApp.innerHTML = ''

}
function a() {
    getInput()

    const dataCalendar = document.getElementsByName('dataBox3')[0].value
   
    fetch(`http://api.nbp.pl/api/exchangerates/tables/${inputCheckboxesContentValue}/${dataCalendar}/?format=json`)
 .then(tabelaNbp => tabelaNbp.json())
 .then(tabelaNbp => {
    clear()

    for(let i =0; i < tabelaNbp[0].rates.length; i++ ) {

        createdElementTable(tabelaNbp[0].rates[i], inputCheckboxesContentValue )
    }
 })
 .catch(error => alert("brak danych"))
    



}

function createdElementTable(dataCoin, checboxValue) {
  
    const elementApp = document.getElementById('app')
    let divClassCard = document.createElement('div')
    divClassCard.classList.add('card')
    let divCardBody = document.createElement('div')
    divCardBody.classList.add('card-body')


    if(waluta === '') {
 /* created h5 */
 let elementH5 = document.createElement('h5')
 elementH5.classList.add('card-title')
 let elementH5Text = document.createTextNode(dataCoin.currency)
 elementH5.appendChild(elementH5Text)
 
 divCardBody.appendChild(elementH5)

 /* ele p */
 let elementPFirst = document.createElement('p')
 elementPFirst.classList.add('card-text')
 let elementPFirstText = document.createTextNode(dataCoin.code)

 elementPFirst.appendChild(elementPFirstText)
 divCardBody.appendChild(elementPFirst)

    } else {

 /* created h5 */
 let elementH5 = document.createElement('h5')
 elementH5.classList.add('card-title')
 let elementH5Text = document.createTextNode(dataCoin.effectiveDate)
 elementH5.appendChild(elementH5Text)
 
 divCardBody.appendChild(elementH5)

 /* ele p */
 let elementPFirst = document.createElement('p')
 elementPFirst.classList.add('card-text')
 let elementPFirstText = document.createTextNode(dataCoin.no)

 elementPFirst.appendChild(elementPFirstText)
 divCardBody.appendChild(elementPFirst)

    }


    if(checboxValue == 'c') {

        let elementPSecond = document.createElement('p')
        elementPSecond.classList.add('card-text')
        let elementPSecondText = document.createTextNode(dataCoin.bid + " end " + dataCoin.ask )
        elementPSecond.appendChild(elementPSecondText) 
        divCardBody.appendChild(elementPSecond)
    }
    else {
        let elementPSecond = document.createElement('p')
        elementPSecond.classList.add('card-text')
        let elementPSecondText = document.createTextNode(dataCoin.mid)
        elementPSecond.appendChild(elementPSecondText) 
        divCardBody.appendChild(elementPSecond)

    }
   



    divClassCard.appendChild(divCardBody)
   /* dodawanie całej carty do elelntu o id = app */
  
    elementApp.appendChild(divClassCard)

}




function getOneCoin() {
getInput()


waluta = document.getElementById('exampleFormControlSelect1').value


fetch(`http://api.nbp.pl/api/exchangerates/rates/${inputCheckboxesContentValue}/${waluta}/?format=json`)
.then(oneWaluta => oneWaluta.json())
.then(oneWaluta => {
    clear()
    console.log(oneWaluta)
    for(let i = 0; i< oneWaluta.rates.length; i++) {
        createdElementTable( oneWaluta.rates[i], inputCheckboxesContentValue)

    }


})
.catch(error => alert("brak danych"))


}

function handleTopCount () {
    getInput()
    topCount = document.getElementById('selectTopCount').value
    console.log(topCount)
    fetch(`http://api.nbp.pl/api/exchangerates/tables/${inputCheckboxesContentValue}/last/${topCount}/?format=json`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        clear()
       res.forEach(function(item) {
               for(let i = 0; i< item.rates.length; i++) {
                   
               createdElementTable(item.rates[i], inputCheckboxesContentValue)

           }
       })
    })

}