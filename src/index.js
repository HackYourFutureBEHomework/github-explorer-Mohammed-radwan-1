
let index = 0, i = 0;
// let ContData = [];

// function fetchJSON(url, cb) {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.responseType = 'json';
//   xhr.onload = () => {
//     if (xhr.status < 400) {
//       cb(null, xhr.response);
//     } else {
//       cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
//     }
//   };
//   xhr.onerror = () => cb(new Error('Network request failed'));
//   xhr.send();
// }
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.responseText);
      }
    }
    xhr.onerror = () => reject('404 Server Error');
    xhr.send();
  });
}

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.keys(options).forEach((key) => {
    const value = options[key];
    if (key === 'html') {
      elem.innerHTML = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function main(url) {

  fetchJSON(url).then(JSON.parse).then(data => {

    const root = document.getElementById('root');
    const $header = createAndAppend('header', root, { class: 'header' });
    const $HyfText = createAndAppend('p', $header, { html: 'HYF Repositories' });
    const $options = createAndAppend('select', $header, { class: 'select' });
    const $allInfo = createAndAppend('div', root, { class: 'all-info' });
    const $leftSide = createAndAppend('div', $allInfo, { class: 'left-side' });
    const $rightSide = createAndAppend('div', $allInfo, { class: 'right-side' });
    const $contribute = createAndAppend('p', $rightSide, { class: 'contHeader' });
    const $contributorsDiv = createAndAppend("div", $rightSide, { className: "contributors" });
    const $contributorsList = createAndAppend("ul", $contributorsDiv, { className: "contributors-list" });

    $options.addEventListener('change', (e) => {
      $leftSide.innerHTML = '';
      if ($options.value == -1) {
        $allInfo.setAttribute('style', 'display:none;');

      } else {
        $allInfo.setAttribute('style', 'display:;');

        const $table = createAndAppend('table', $leftSide);
        const $tbody = createAndAppend('tbody', $table);
        const $tr = createAndAppend('tr', $tbody);
        const $repository = createAndAppend('td', $tr, { html: '<h4>Repository:</h4>' });
        const $repositoryName = createAndAppend('td', $tr);
        const $repositoryUrl = createAndAppend('a', $repositoryName, { html: data[$options.value].name, href: data[$options.value].html_url, target: "_blank" });
        const $tr1 = createAndAppend('tr', $tbody);
        const $forks = createAndAppend('td', $tr1, { html: '<h4>Forks:</h4>' });
        const $forksValue = createAndAppend('td', $tr1, { html: "<h5>" + data[$options.value].forks + "</h5>", class: 'forks' });
        const $tr2 = createAndAppend('tr', $tbody);
        const $updated = createAndAppend('td', $tr2, { html: '<h4>Updated:</h4>' });
        const $updatedDate = createAndAppend('td', $tr2, { html: "<h5>" + data[$options.value].updated_at.replace(/T.*Z/, "") + "</h5>" });
        const $tr3 = createAndAppend('tr', $tbody);
        if (data[$options.value].description !== null) {
          const $description = createAndAppend('td', $tr3, { html: '<h4>Description:</h4>' });
          const $descriptionDetails = createAndAppend('td', $tr3, { html: "<h5>" + data[$options.value].description + "</h5>" });
        }

        const contributors = data[$options.value].contributors_url;
        fetchJSON(contributors).then(JSON.parse).then(contData => {
          $contributorsList.innerHTML = "";
          for (contributor of contData) {
            $contribute.innerHTML = '</h5><center>Contributions<center></h5>';
            const $contributorItem = createAndAppend("li", $contributorsList, { class: "contributor-item" });
            const $contributoravatar = createAndAppend('img', $contributorItem, { class: "contributor-avatar", src: contributor.avatar_url, width: 50 });
            const $contributorLogin = createAndAppend("p", $contributorItem, { class: "contributor-login", html: contributor.login });
            const $contributorbadge = createAndAppend("p", $contributorItem, { class: "contributor-badge", html: contributor.contributions });
          }
        });
      }
    });

    createAndAppend('option', $options, { html: 'Seclet a repository name...', value: '-1' });
    data.sort((a, b) => (a.name).localeCompare(b.name));
    // data.sort(function (a, b) {
    //   let x = a.name.toLowerCase();
    //   let y = b.name.toLowerCase();
    //   if (x < y) { return -1; }
    //   if (x > y) { return 1; }
    //   return 0;
    // });
    for (item of data) {
      createAndAppend('option', $options, { html: item.name, value: index });
      index = index + 1;
    }
  }).catch(err => document.getElementById('root').innerHTML = err);
}
const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

// fetchJSON(HYF_REPOS_URL)
//   .then(data => console.log(data));


window.onload = () => main(HYF_REPOS_URL);

