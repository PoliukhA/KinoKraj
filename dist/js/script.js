document.addEventListener('DOMContentLoaded', function(event) {

    let url = 'https://w-strapi-movies-app-9wxhf.ondigitalocean.app/api/movies'

    const modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');


    function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    }

    modalCloseBtn.addEventListener('click', closeModal);
    
    fetch(url)
        .then((response) => {
            return response.json();
        }).then(data => {
            for (var i = 0; i < data['data'].length; i++){
        
                let attributes = data.data[i].attributes,
                      title = attributes.title,
                      descr = attributes.description,
                      author = attributes.author,
                      available = attributes.available,
                      year = attributes.year,
                      id = data.data[i].id;
                
                if (available == true) {
                    available = 'Dostępny'
                } else {
                    available = 'Wypożyczony'
                }

                if (year == null) {
                    year = 'Niewiadomo'
                }

                if (author == '') {
                    author = 'Niewiadomo'
                }


                const movieElement = document.createElement("div");
                
                poster = Math.floor(Math.random() * 3);
                
                movieElement.className = "catalog__item";

                movieElement.innerHTML = `<img src="dist/icons/${poster}.jpg" class="catalog__item-poster" alt="poster">
                                            <div class="catalog__item-info">
                                                <div class="catalog__item-header">
                                                    <h3 class="catalog__item-title">${title} |&nbsp;</h3>
                                                    <p class="catalog__item-id">id: ${id}</p>
                                                </div>
                                                <div class="catalog__item-descr">${descr}</div>
                                                <div class="catalog__item-author">Reżyseria: <span class="span-author">${author}</span></div>
                                                <div class="catalog__item-year">Premiera: <span class="span-year">${year}</span></div>
                                                <div class="catalog__item-available">${available}</div>
                                                <div class="catalog__item-btns">
                                                    <button type="button" value="${id}" class="btn btn_info"  data-modal="">info</button>
                                                    <button type="button" value="${id}" class="btn btn_delete">delete</button>
                                                </div>
                                            </div>`                 

                document.querySelector('.catalog__wrapper').appendChild(movieElement);

            }

            const removeBtns = document.querySelectorAll(".btn_delete");
            
            removeBtns.forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    let film_url = url + '/' + btn.value
                    fetch(film_url, {
                        method: "DELETE",
                    })

                    btn.parentElement.parentElement.parentElement.remove()
                })
            });

            const modalBtns = document.querySelectorAll(".btn_info");

            modalBtns.forEach(btn => {
                btn.addEventListener('click', () => {

                    modalTitle = document.querySelector(".modal__title"),
                    modalNr = document.querySelector(".modal__id"),
                    modalDescr = document.querySelector(".modal__descr"),
                    modalAuthor = document.querySelector(".modal__author span"),
                    modalYear = document.querySelector(".modal__year span"),
                    modalAvailable = document.querySelector(".modal__available");

                    parent = btn.parentElement.parentElement
                    catalogTitle = parent.querySelector("h3").innerHTML,
                    catalogId = btn.value,
                    catalogDescr = parent.querySelector(".catalog__item-descr").innerHTML,
                    catalogAuthor = parent.querySelector(".catalog__item-author span").innerHTML,
                    catalogYear = parent.querySelector(".catalog__item-year span").innerHTML,
                    catalogAvailable = parent.querySelector(".catalog__item-available").innerHTML;


                    modalTitle.innerHTML = catalogTitle;
                    modalDescr.innerHTML = catalogDescr;
                    modalAuthor.innerHTML = catalogAuthor;
                    modalYear.innerHTML = catalogYear;
                    modalAvailable.innerHTML = catalogAvailable;
                    modalNr.innerHTML = btn.value

                    modal.classList.add('show');
                    modal.classList.remove('hide')
                });
            });

        });
});