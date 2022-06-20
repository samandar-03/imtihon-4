let eltamplate = Bayid('template').content
let elList = Bayid('wrapper')
let elAdd = doQuery('.js-add')
let elSearch = doQuery('.js-search')
let sortBy = doQuery('#sortby')
let elEditModal = doQuery('.js-modal')

let sortsection = {
    lh:(a,b) =>{
        if (a.price > b.price) {
            return 1
        }else{
            return -1
        }
    },
    hl:(a,b) =>{
        if (a.price < b.price) {
            return 1
        }else{
            return -1
        }
    },
    bh:(a,b) =>{
        if (a.birthDate > b.birthDate) {
            return 1
        }else{
            return -1
        }
    },
    hb:(a,b) =>{
        if (a.birthDate < b.birthDate) {
            return 1
        }else{
            return -1
        }
    },

}
function handleEditit(event){
  let product = products.find(evt=>evt.id==event.target.dataset.id);
  for(let t in product){
    if(t=="isFavorite") continue;
    if(t=="sizes"){
        Bayid("w").value=product[t].width;
        Bayid("h").value=product[t].height;

    }else{
        Bayid(t).value=product[t];
    }
  }
}

let renderProduct=(products)=>{
    elList.innerHTML = null
    products.forEach(product =>{
        function CARD(params) {
            return elCard.querySelector(params)
          }
        let elLi = document.createElement('li')
        let elCard =eltamplate.cloneNode(true)
        let elTitle = CARD('.card-title')
        let elPrise = CARD('.card-text')
        let elImg = CARD('.img')
        let elBadge = CARD('.badge ') 
        let elYear = CARD('.card-texts')
        let elFeatures = CARD('.features')
        let elEditBtn = CARD('.js-edit')
        let elDelete = CARD('.js-delete')

        elDelete.dataset.id = product.id
        
        elEditBtn.addEventListener("click",handleEditit);
            
     
        elEditBtn.dataset.id = product.id
        elLi.dataset.id = product.id
       
        elFeatures.className ='badge bg-primary me-1 mb-1'
        elFeatures.textContent = product.features
        elYear.textContent = product.birthDate
        elBadge.textContent = product.sizes.width + " x " +product.sizes.height
        elImg.src = product.img
        elPrise.textContent ="$"+  product. price
        elTitle.textContent = product.title
        elLi.className = 'col-6'
        elLi.appendChild(elCard)
        elList.appendChild(elLi)
    })
        
}
 renderProduct(products)

function hadleAdd(evt) {
    evt.preventDefault()
    elList.innerHTML = null
    let parrotTitle = Bayid('parrot-title')
    let parrotImg = Bayid('parrot-img')
    let parrotPrice = Bayid('price')
    let parrotDate = Bayid('parrot-date')
    let parrotWidth = Bayid('parrot_width')
    let parrotHeight = Bayid('parrot_height')
    let elFeatures = Bayid('features')


   let data = {
        id: uuid.v4(),
        title: parrotTitle.value,
        img: parrotImg.value,
        price: parrotPrice.value,
        birthDate: parrotDate.value,
        sizes: {
          width:parrotWidth.value,
          height:  parrotHeight.value,
        },
        isFavorite: false,
        features: elFeatures.value
      }   

        products.push(data)
        renderProduct(products)
 
}

function handleSearch(evt) {
    evt.preventDefault()
    const search = Bayid('search')
    const value = search.value.trim()
    const sort = sortBy.value
    let regax = new RegExp(value,'gi')

    let searchParrot = products.filter((product) => product.title.match(regax))
    elList.innerHTML=null

    products.sort(sortsection[sort])

    renderProduct(searchParrot)
}

function handleEdit(evt) {
    evt.preventDefault();
let product={
    "id":Bayid("id").value,
    "title":Bayid("title").value,
    "img" : Bayid("img").value,
    "price":Bayid("narx").value,
    "birthDate": Bayid("birthDate").value,
    "sizes":{
    "width" :Bayid("w").value,
    "height":Bayid("h").value
    },
    "features":Bayid("izoh").value
}

let index = findIndexByKeyValue(products,"id",product.id);
products[index]=product;
renderProduct(products);
}
function findIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
        return -1;
    }
    function hendelDelete(evt){
        if (evt.target.matches('.js-delete')) {
            let deleteBtn =  evt.target.closest('li')
            let BtnId = deleteBtn.dataset.id
            let deleteCard = products.filter(product => product.id !=BtnId) 
            products = deleteCard
            renderProduct(deleteCard);
        }
    }

 elList.addEventListener("click", hendelDelete)
 elAdd.addEventListener("submit", hadleAdd)
 elSearch.addEventListener("submit", handleSearch)
 elEditModal.addEventListener("submit", handleEdit)
