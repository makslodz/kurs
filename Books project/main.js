function getSelect() {
  fetch(`http://localhost:3000/selectGatunek`)
    .then(res => res.json())
    .then(res => {
      let mainSelect = document.getElementById('gatunek')
      res.forEach(element => {
        let optionElement = document.createElement('option')
        optionElement.value = element.id
        optionElement.innerText = element.name
        mainSelect.appendChild(optionElement)

      });
    })


}
getSelect()

document.getElementById('mainBtn').addEventListener('click', createBook)

function createBook(e) {
  e.preventDefault()
  const book = {
    title: String,
    author: String,
    description: String,
    type: Number
  }

  const allData = document.getElementsByClassName('form-control')
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].id == 'tytul') {
      book.title = allData[i].value
    }
    if (allData[i].id == 'opis') {
      book.description = allData[i].value
    }
    if (allData[i].id == 'autor') {
      book.author = allData[i].value
    }
    if (allData[i].id == 'gatunek') {
      book.type = allData[i].value
    }



  }
  fetch('http://localhost:3000/books', {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))

  getBooks()

}


function getBooks() {
  document.getElementById('app').innerHTML = ''
  fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(res => {
      res.forEach(book => {

        const containerApp = document.getElementById('app')
        const addDiv = document.createElement('div')
        addDiv.classList.add('begin')
        const addHr = document.createElement('hr')
        const addH2 = document.createElement('h2')
        const addH3 = document.createElement('h3')
        const addH5 = document.createElement('h5')
        addH5.classList.add('description')
        const addP = document.createElement('p')
        const addButton = document.createElement('button')
        addButton.classList.add('btn')
        addButton.classList.add('btn-warning')
        addButton.innerHTML = "Edit"
        addButton.setAttribute("data-toggle", "modal")
        addButton.setAttribute("data-target", "#edtiBook")
        const addButtonTogle = document.createElement('button')
        addButtonTogle.classList.add('btn')
        addButtonTogle.setAttribute('data-toggle', 'collapse')
        addButtonTogle.setAttribute('data-target', '#description')
        addButtonTogle.innerHTML = "Show opis"
        addButtonTogle.classList.add('btn-info')
        addP.classList.add('collapse')
        addP.setAttribute('id', 'description')
        addButton.onclick = function () {
          createModal(book)
        }
        addH2.innerText = book.author
        addH3.innerText = book.title
        addH5.innerText = book.type
        addP.innerText = book.description
        if (book.type === 1) {

          addDiv.classList.add('blue-border')
          addH5.innerText = "Kyminał"


        }
        if (book.type === 2) {
          addDiv.classList.add('yellow-border')
          addH5.innerText = "Powieści Historyczna"

        }
        if (book.type === 3) {
          addDiv.classList.add('red-border')
          addH5.innerText = "Romans"
        }
        if (book.type === 4) {
          addDiv.classList.add('green-border')
          addH5.innerText = "Reportaż"
        }


        addDiv.appendChild(addH2)
        addDiv.appendChild(addH3)
        addDiv.appendChild(addButtonTogle)
        addDiv.appendChild(addP)
        addDiv.appendChild(addH5)
        addDiv.appendChild(addButton)
        containerApp.appendChild(addDiv)
        containerApp.appendChild(addHr)


      })
    })

}

getBooks()

let bookModal = Object

function createModal(book) {
  bookModal = book
  const tytulModal = document.getElementById('tytulModal')
  tytulModal.value = book.title
  const autorModal = document.getElementById('autorModal')
  autorModal.value = book.author
  const opisModal = document.getElementById('opisModal')
  opisModal.value = book.description


}

function editeBook() {

  const tytulModal = document.getElementById('tytulModal')
  const autorModal = document.getElementById('autorModal')
  const opisModal = document.getElementById('opisModal')
  const bookEdit = {
    title: tytulModal.value,
    author: autorModal.value,
    description: opisModal.value,
    type: bookModal.type
  }
  fetch(`http://localhost:3000/books/${bookModal.id}`, {
      method: "PUT",
      body: JSON.stringify(bookEdit),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))

  getBooks()
  document.getElementById('closeModal').click()

}

function deleteBook() {
  fetch(`http://localhost:3000/books/${bookModal.id}`, {
      method: "DELETE",
      body: JSON.stringify(bookModal),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))

  getBooks()
  document.getElementById('closeModal').click()
}