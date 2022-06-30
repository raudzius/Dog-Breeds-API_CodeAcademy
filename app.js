const form = document.forms[0];

fetch('https://dog.ceo/api/breeds/list/all')
  .then(res => res.json())
  .then(dogBreeds => {
    const selectEl = document.getElementById('dog-select');

    for (key in dogBreeds.message) {
      const optionEl = document.createElement('option');
      const optionGroupEl = document.createElement('optgroup');
      const subBreeds = dogBreeds.message[`${key}`];

      if (subBreeds.length > 0) {
        optionGroupEl.label = key;
        optionGroupEl.value = key;

        subBreeds.forEach(subBreed => {
          const optionEl = document.createElement('option');
          optionEl.textContent = subBreed;
          optionEl.value = key + '/' + subBreed;
          optionGroupEl.append(optionEl);
        });
      }

      optionEl.textContent = key;
      optionEl.value = key;
      optionGroupEl.value
        ? selectEl.append(optionGroupEl)
        : selectEl.append(optionEl);
    }
  });

form.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('img') && document.querySelector('img').remove();

  const form = event.target;
  const selectedDog = form.elements['dog-select'].value;
  const imgEl = document.createElement('img');

  fetch(`https://dog.ceo/api/breed/${selectedDog}/images`)
    .then(res => res.json())
    .then(breedImages => {
      const randomIndex = Math.floor(
        Math.random() * breedImages.message.length
      );
      breedImages.message[randomIndex];
      imgEl.src = breedImages.message[randomIndex];
      imgEl.alt = selectedDog;
      document.body.append(imgEl);
    });
});

// PAPILDOMA UŽDUOTIS (https://dog.ceo/dog-api/):
// 1. Sukurti formą, kuri leidžia pasirinkti šuns veislę ir grąžina atsitiktinę tos veislės nuotrauką.
// 2. Jeigu šuns veislė yra išvestinė (sub-breed), tai šalia ji turėtų būti atvaizduojama parašant pagrindinės veislės pavadinimą (breed) ir šalia išvestinės veislės pavainimą (sub-breed).
// viena kategorija
// antra kategorija
// Bulldog (French)
// Bulldog (English)
// Bulldog (Belgean)
// ketvirta kategorija
