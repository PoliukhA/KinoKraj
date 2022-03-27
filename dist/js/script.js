document.addEventListener('DOMContentLoaded', function(event) {

    let url = 'https://w-strapi-movies-app-9wxhf.ondigitalocean.app/api/movies'

    fetch(url)
        .then((response) => {
            return response.json();
        }).then(data => {
            for (var i = 0; i < data['data'].length; i++){
        
                const attributes = data.data[i].attributes,
                      title = attributes.title,
                      descr = attributes.description,
                      author = attributes.author,
                      available = attributes.available,
                      year = attributes.year,
                      id = data.data[i].id;

                const movieElement = document.createElement("div");
                
                poster = Math.floor(Math.random() * 3);
                
                movieElement.className = "catalog-item";

                movieElement.innerHTML = `<img src="../icons/${poster}.jpg" class="catalog-item__poster" alt="poster">
                                            <div class="catalog-item__info">
                                                <h3 class="catalog-item__title">${title}</h3>
                                                <div class="catalog-item__descr">${descr}</div>
                                                <div class="catalog-item__author"><span>Reżyseria: </span>${author}</div>
                                                <div class="catalog-item__year"><span>Premiera: </span>${year}</div>
                                                <div class="catalog-item__available">${available}</div>
                                                <div class="catalog__btns">
                                                    <button type="button" value="${id}" class="btn btn_info">info</button>
                                                    <button type="button" value="${id}" class="btn btn_delete">delete</button>
                                                </div>
                                            </div>`                 

                document.querySelector('.catalog').appendChild(movieElement);

            }

            const removeBtns = document.querySelectorAll(".btn_delete");
            
            removeBtns.forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    let film_url = url + '/' + btn.value
                    fetch(film_url, {
                        method: "DELETE",
                    })

                    btn.parentElement.parentElement.parentElement.remove()/*proteza*/
                })
            })
        });
});