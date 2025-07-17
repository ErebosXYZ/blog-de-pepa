// Información de las ciudades
const ciudades = {
    palamos: {
        nombre: "Palamós",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7S9XTzYJAo90itEe4avmv2JyFs6pcgnvIw&s",
        descripcion: "Palamós es una localidad costera de la Costa Brava, conocida por sus playas y su puerto pesquero. Es famosa por sus gambas y su ambiente marinero."
    },
    blanes: {
        nombre: "Blanes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/BLANES_DONDE_COMIENZA_LA_%29%28%28%28%28%28%C2%BA%29_COSTA_BRAVA%28%C2%BA%29%29%29%29%29%28_-_panoramio.jpg/330px-BLANES_DONDE_COMIENZA_LA_%29%28%28%28%28%28%C2%BA%29_COSTA_BRAVA%28%C2%BA%29%29%29%29%29%28_-_panoramio.jpg",
        descripcion: "Blanes es la puerta de entrada a la Costa Brava, famosa por su jardín botánico y su animado paseo marítimo. Sus playas y calas son muy apreciadas por los visitantes."
    }
};

// ¡Buena suerte!



const citySelector = document.getElementById('citySelector');
const cityInfo = document.getElementById('cityInfo');
const cityName = document.getElementById('cityNombre');
const cityImage = document.getElementById('cityImagen');
const cityDescription = document.getElementById('cityDescripcion');


// ORIGINAL VERSION
// citySelector.addEventListener('change', (event) => {
//     const city = event.target.value;
//     cityInfo.style.display = city !== "" ? block : none;
//     if (city === "palamos") {
//         cityName.textContent = ciudades.palamos.nombre;
//         cityImage.src = ciudades.palamos.imagen;
//         cityDescription.textContent = ciudades.palamos.descripcion;
//     } else if (city === "blanes") {
//         cityName.textContent = ciudades.blanes.nombre;
//         cityImage.src = ciudades.blanes.imagen;
//         cityDescription.textContent = ciudades.blanes.descripcion;

//     }  

// });


//  * SHORTER VERSION

citySelector.addEventListener('change', async (event) => {
    const city = event.target.value;

    //   Si city no és igual a un string buit fem un display block, en cas contrari fem un display none
    cityInfo.style.display = city !== "" ? 'block' : 'none';

    // Si la city (el valor que extreiem de l'event change) de l'objecte ciudades forma part de les dades de l'objecte, omplim el camp corresponent amb la propietat corresponent
    if (ciudades[city]) {
        const data = ciudades[city];
        cityName.textContent = data.nombre;
        cityImage.src = data.imagen;
        cityDescription.textContent = data.descripcion;
    }

    const url = `https://bravabook.onrender.com/api/apartments/search?city=${city}`

    try {
        const response = await fetch(url);
        // Gestió d'errors de la resposta
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    
        const accomodationsInfo = document.getElementById('accomodationsInfo');
        const numAccomodations = document.getElementById('numAccomodations');
        const accomodations = document.getElementById('accomodations');

        // Assegurem que accomodations es reiniciï sempre (opcional)
        accomodations.innerHTML = "";

        // Si hi ha més de 0 objectes dins de data, mostrem el contenidor i el text amb la quantitat 
        if (data.length > 0) {
            accomodationsInfo.style.display = "block";
            numAccomodations.textContent = data.length;
        } else {
            accomodationsInfo.style.display = "none";
            return;
        }
        // Recorrem l'array d'objectes que és data amb el mètode forEach, igual que a la pràctica bravabook(kihome booking)
        
        data.forEach( apartment => {
            // Creem un div per a cada element de l'array
            const card = document.createElement('div');

            // Aquest div conté un enllaç que ens envia a l'endpoint de l'apartament a través de la id del seu objecte. si afegim # i la id d'un element html concret de l'endpoint on accedim, ens redirigirà automàticament allà.
            card.innerHTML = `
            <h2><a href=https://bravabook.onrender.com/apartment/${apartment._id}#reservation>${apartment.title}</a></h2>
            <img src=${apartment.mainPhoto}/>
            <p>Precio por noche: <span class=apartment-price>${apartment.price}€</span>/p>
            `

            // Appendchild agrega un fill al node del DOM que estem manipulant, en aquest cas afegeix un div card a accomodations.
            accomodations.appendChild(card);

            // Canviem el color del preu depenent de si costa menys de 100€ (verd) o més de 200€ per nit.
            if (apartment.price < 100) {
                card.querySelector('.apartment-price').style.color = "green";
            } if (apartment.price > 200) {
                card.querySelector('.apartment-price').style.color = "red";
            }
        });
        
    }
    catch (error) {
        console.error('Hubo un problema con el fetch')
    }
});


