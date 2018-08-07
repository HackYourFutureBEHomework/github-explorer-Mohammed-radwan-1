

let $index = 0;
function createAndAppend(name, parent, options = {}) {
  const $elem = document.createElement(name);
  parent.appendChild($elem);
  Object.keys(options).forEach(($key) => {
    const $value = options[$key];
    if ($key === 'html') {
      $elem.innerHTML = $value;
    } else {
      $elem.setAttribute($key, $value);
    }
  });
  return $elem;
}

async function main(url) {
  try{
    const $data = await fetch(url);
    const data = await $data.json();
    const $header = createAndAppend('header', $root, { class: 'header' });
    createAndAppend('p', $header, { html: 'HYF Repositories' });
    const $options = createAndAppend('select', $header, { class: 'select' });
    const $allInfo = createAndAppend('div', $root, { class: 'all-info' });
    const $leftSide = createAndAppend('div', $allInfo, { class: 'left-side' });
    const $rightSide = createAndAppend('div', $allInfo, { class: 'right-side' });
    const $contribute = createAndAppend('p', $rightSide, { class: 'contHeader' });
    const $contributorsDiv = createAndAppend("div", $rightSide, { class: "contributors" });
    const $contributorsList = createAndAppend("ul", $contributorsDiv, { class: "contributors-list" });
    createAndAppend('option', $options, { html: 'Seclet a repository name...', value: '-1' });
    //Sort the list
    data.sort((a, b) => (a.name).localeCompare(b.name));
    
    for (item of data) {
      createAndAppend('option', $options, { html: item.name, value: $index });
      $index++;
    }
    $options.addEventListener('change', createLayout);
    async function createLayout()  {
      $leftSide.innerHTML = '';
      if ($options.value == -1) {
        $allInfo.setAttribute('style', 'display:none;');
      } else {
        $allInfo.setAttribute('style', 'display:flex;');
        const $table = createAndAppend('table', $leftSide);
        const $tbody = createAndAppend('tbody', $table);
        const $tr = createAndAppend('tr', $tbody);
        createAndAppend('td', $tr, { html: '<h4>Repository:</h4>' });
        const $repositoryName = createAndAppend('td', $tr);
        createAndAppend('a', $repositoryName, { html: data[$options.value].name, href: data[$options.value].html_url, target: "_blank" });
        const $tr1 = createAndAppend('tr', $tbody);
        createAndAppend('td', $tr1, { html: '<h4>Forks:</h4>' });
        createAndAppend('td', $tr1, { html: "<h5>" + data[$options.value].forks + "</h5>", class: 'forks' });
        const $tr2 = createAndAppend('tr', $tbody);
        createAndAppend('td', $tr2, { html: '<h4>Updated:</h4>' });
        createAndAppend('td', $tr2, { html: "<h5>" + data[$options.value].updated_at.replace(/T.*Z/, "") + "</h5>" });
        const $tr3 = createAndAppend('tr', $tbody);
        if (data[$options.value].description !== null) {
          createAndAppend('td', $tr3, { html: '<h4>Description:</h4>' });
          createAndAppend('td', $tr3, { html: "<h5>" + data[$options.value].description + "</h5>" });
        }
        const contributors = data[$options.value].contributors_url;
        try{
          const $controbutors = await fetch(contributors);
          const contData=await $controbutors.json();
          console.log(contData);
          $contributorsList.innerHTML = "";
          for (contributor of contData) {
            $contribute.innerHTML = '</h5><center>Contributions<center></h5>';
            const $contributorItem = createAndAppend("li", $contributorsList, { class: "contributor-item" });
            const $contributorAnchor=createAndAppend('a',$contributorItem,{href:contributor.html_url ,class:"contributorAnchor"})
            createAndAppend('img', $contributorAnchor, { class: "contributor-avatar", src: contributor.avatar_url, width: 50 });
            createAndAppend("p", $contributorAnchor, { class: "contributor-login", html: contributor.login });
            createAndAppend("p", $contributorAnchor, { class: "contributor-badge", html: contributor.contributions });
          }
        }catch(err){$rightSide.innerHTML = err;}
      }
    }
  }catch (err){$error.innerHTML = err;}
}
const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
const $root = document.getElementById('root');
const $error=createAndAppend('div',$root,{class:"alert-error"});


window.onload = () => main(HYF_REPOS_URL);

