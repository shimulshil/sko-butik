    function cE(el){
        return document.createElement(el);
    }

    function cT(txt){
        return document.createTextNode(txt);
    }
    
    //Funktion der looper gennem alle product
    function allProducts(page){
        let parentElement = document.querySelector(".products");
        
        // parentElement.innerHTML=data[2].brand;
        data.forEach(function(element, index){ // callback function / forEach is loop declear in java script
            // Vi laver elementer
            // let tag = cE("div");
            let tag = cE("a");
            let tagHead = cE("h2");
            let tagBrand = cE("h3");
            let tagImage = cE("img");
            let tagPrice = cE("p");

            //vi sætter en href attribute
            tag.setAttribute("href","single.html?productid="+index);
            //vi sætte en data attribute
            tag.dataset.price = element.price*1.25;
            //vi laver elementer inhold
            // tagHead.appendChild(cT(data[1].product)); same as bellow liner
            tagHead.appendChild(cT(element.product));
            tagBrand.appendChild(cT(element.brand));
            tagPrice.appendChild(cT(
                Math.floor(element.price*1.25)+" DKK."
                ));
            tagImage.setAttribute("src",element.image);

            //Sæt indholdet ind i tag element
            tag.appendChild(tagHead);
            tag.appendChild(tagBrand);
            tag.appendChild(tagImage);
            tag.appendChild(tagPrice);

            //CSS klasser
            tag.classList.add("product");
            tag.classList.add(element.brand);
            element.cat.forEach(function(elm){
                tag.classList.add(elm);
            });

            element.sizes.forEach(function(elm){
                tag.classList.add(elm);
            });
            element.colors.forEach(function(elm){
                tag.classList.add(elm);
            })
             //Spyt det ud på siden
             if(page=="index"){
            document.querySelector(".products").appendChild(tag);
            }
            else{
                let urlString = window.location.href;
                let urlObject = new URL (urlString);
                let cat1 = urlObject.searchParams.get("cat1");
                let cat2 = urlObject.searchParams.get("cat2");
                if(element.product==cat2 && tag.classList.contains(cat1)){
                    document.querySelector(".products").appendChild(tag);
                }
            }

        });

    }
function singleProduct(){
    let urlString = window.location.href;
    let urlObject = new URL (urlString);
    let id = urlObject.searchParams.get("productid");

    let tag = cE("form");
    let tagHead = cE("h1");
    let tagImage = cE("img");
    let tagBrand = cE("h2");
    let tagSizes = cE("div");
    let tagColors =cE("div");
    let tagAmount = cE("select");
    let tagAmountLabel = cE("label");
    let tagPrice =cE("p");
    let hiddenId = cE("input");
    hiddenId.value = id;
    hiddenId.setAttribute("type", "hidden");
    hiddenId.setAttribute("name", "productid");

    tag.setAttribute("action", "checkout.html");

    tagHead.appendChild(cT(data[id].product));
    tagBrand.appendChild(cT(data[id].brand));
    tagPrice.appendChild(cT("Pris inkl. moms:"+data[id].price+"DKK"));

    data[id].sizes.forEach(function(element){
        let input = cE("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "size");
        input.value=element;
        label = cE("label");
        label.appendChild(cT(element));
        tagSizes.appendChild(label);
        tagSizes.appendChild(input);
    });

    data[id].colors.forEach(function(element){
        let input = cE("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "color");
        input.value=element;
        label = cE("label");
        label.appendChild(cT(element));
        tagColors.appendChild(label);
        tagColors.appendChild(input);
    });

    tagAmount.setAttribute("name", "antal");

    tagImage.setAttribute("src",data[id].image);

    tagHead.classList.add("product-heading");
    tagImage.classList.add("product-image");
    tagBrand.classList.add("product-brand");
    tagSizes.classList.add("product-list");
    tagColors.classList.add("product-list");
    tagPrice.classList.add("product-price");

    tagAmountLabel.appendChild(cT("Vælg antal"));
    [1,2,3,4,5].forEach(function(element){
        let option =cE("option");
        option.value = element;
        option.appendChild(cT(element));
        tagAmount.appendChild(option);
    });

    sendToCartBtn = cE("button");
    sendToCartBtn.appendChild(cT("Køb"));

    tag.appendChild(tagHead);
    tag.appendChild(tagBrand);
    tag.appendChild(tagImage);
    tag.appendChild(tagSizes);
    tag.appendChild(tagColors);
    tag.appendChild(tagAmountLabel);
    tag.appendChild(tagAmount);
    tag.appendChild(sendToCartBtn);
    tag.appendChild(tagPrice);
    tag.appendChild(hiddenId);
    document.querySelector(".single-product").appendChild(tag);
}


//Filters
let filterForm = document.querySelectorAll("#form-filter input");
let checkedFilters1 = [null];
let checkedFilters2 = [null];

filterForm.forEach(function(element){
    element.addEventListener("change", function(){
        let slider = document.getElementById("form-price");
       if(element.dataset.filter == 1){
           //sæt noget ind eller fjern fra checkedfilter1
           pushOrSplice(checkedFilters1, this.value);
       }else if(element.dataset.filter == 2){
        pushOrSplice(checkedFilters2, this.value);
       }
       else{
            //sæt noget ind eller fjern fra checkedfilter2
            console.log(this.value);
            

       }
       function pushOrSplice(array, value){
           if(element.checked){
               array.push(value);
           }else{
               let curentIndex = array.indexOf(value);
               array.splice(curentIndex, 1);
           }
       }
       let products = document.querySelectorAll(".product");
       products.forEach(function(element){
            let isInArray1 = false;
            let isInArray2 = false;
            let withinPriceRange = false;
            checkedFilters1.forEach(function(elm){
                if(element.classList.contains(elm) || checkedFilters1.length==1){
                    isInArray1 = true;
                }

            });
            checkedFilters2.forEach(function(elm){
                if(element.classList.contains(elm) || checkedFilters2.length==1){
                    isInArray2 = true;
                }

            });
            if(parseInt(element.dataset.price) < parseInt(slider.value)){
                withinPriceRange = true;
            }

            if(isInArray1==true && isInArray2==true && withinPriceRange==true){
                element.style.display="block";
            }else{
                element.style.display="none";
            }
       });

    });
});

//Menu
let noClickMenuLinks = document.querySelectorAll(".has-dropdown>a");

noClickMenuLinks.forEach(function(element){
    element.addEventListener("click", function(event){
        event.preventDefault();
        let elementToClose = this.parentNode.children[1];
        elementToClose.classList.toggle("visible");
    });
});

function checkOut(){
    let urlString = window.location.href;
    let urlObject = new URL (urlString);

    let tableElements = ["Produkt", "Antal", "Farve", "Størelse", "Stk. Pris", "Total"];
    let tableContent = [
        data[urlObject.searchParams.get("productid")].product,
        urlObject.searchParams.get("antal"),
        urlObject.searchParams.get("color"),
        urlObject.searchParams.get("size"),
        data[urlObject.searchParams.get("productid")].price+",00 Dkk",
        urlObject.searchParams.get("antal") * data[urlObject.searchParams.get("productid")].price+",00 Dkk"
    ]
    let table = cE("table");
    let tableRow1 = cE("tr");
    let tableRow2 = cE("tr");

    tableElements.forEach(function(element){
        let cell = cE("th");
        cell.appendChild(cT(element));
        tableRow1.appendChild(cell);
        
    })
    tableContent.forEach(function(element){
        let cell = cE("td");
        cell.appendChild(cT(element));
        tableRow2.appendChild(cell);
    })
    table.appendChild(tableRow1);
    table.appendChild(tableRow2);
    document.querySelector(".checkout").appendChild(table);
};