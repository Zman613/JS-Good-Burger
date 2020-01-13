document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  let burgerMenu = document.getElementById('burger-menu')
  let form = document.getElementById('custom-burger')

  function addToMenu(burger) {
    let div = document.createElement('div')
    let title = document.createElement('h3')
    let image = document.createElement('img')
    let description = document.createElement('p')
    let button = document.createElement('button')
    div.className = 'burger'
    title.className = 'burger_title'
    title.innerHTML = burger.name 
    image.src = `${burger.image}`
    description.className = 'burger_description'
    description.innerHTML = burger.description
    button.className = 'button'
    button.innerHTML = 'Add to Order'
    div.append(title)
    div.append(image)
    div.append(description)
    div.append(button)
    burgerMenu.append(div)
  }

  function fetchBurgers() {
    fetch('http://localhost:3000/burgers')
    .then(response => response.json())
    .then(burgers => {
      burgers.forEach(addToMenu)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  fetchBurgers()

  burgerMenu.addEventListener('click', function(){
    if (event.target.className === 'button') {
      let parent = event.target.parentNode
      let title = parent.getElementsByClassName('burger_title')[0].innerHTML
      let orders = document.getElementById('order-list')
      let li = document.createElement('li')
      li.innerHTML = title
      orders.append(li)
    }
  })

  function addNewBurger(burger) {
    fetch('http://localhost:3000/burgers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify(burger)
    })
    .then(response => response.json())
    .then(burger => {
      addToMenu(burger)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  form.addEventListener('submit', function(){
    event.preventDefault()
    console.log(event.target.name.value)
    let name = event.target.name.value
    let description = event.target.description.value
    let image = event.target.url.value
    let newBurger = {name, description, image}
    addNewBurger(newBurger)
    event.target.reset()
  })
  
})
