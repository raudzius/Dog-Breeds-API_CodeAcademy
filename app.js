const form = document.forms[0];
const selectEl = document.getElementById('dog-select');

fetch('https://dog.ceo/api/breeds/list/all')
  .then(res => res.json())
  .then(dogBreeds => {
    for (key in dogBreeds.message) {
      const optionEl = document.createElement('option');
      optionEl.textContent = key;
      optionEl.value = key;
      selectEl.append(optionEl);
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
