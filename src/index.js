// 'use strict';




var xhn = new XMLHttpRequest();
xhn.open('GET', 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100?token=%20d79560f1bfa67a44d1863cb48f73dde3ee40cc42', true);
xhn.withCredentials = true;
xhn.send(null);

let index = 0 ,i=0;
let ContData=[];

  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
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
    const contributors = 'https://api.github.com/repos/HackYourFuture/AngularJS/contributors';
    
    fetchJSON(url, (err, data) => {
      if (err) {
        createAndAppend('div', root, { html: err.message, class: 'alert-error' });
      } else {

        
      const root = document.getElementById  ('root');
      const $header = createAndAppend       ('header',root,{class:'header'});
      const $HyfText = createAndAppend      ('p',$header,{html : 'HYF Repositories'});
      const $options=createAndAppend        ('select',$header,{class:'select'});
      const $allInfo=createAndAppend        ('div',root,{class:'all-info'});
      const $leftSide=createAndAppend       ('div',$allInfo,{class:'left-side'});
      const $rightSide=createAndAppend      ('div',$allInfo,{class:'right-side'});
      const $repository=createAndAppend     ('p',$leftSide,{class:'repo-Name'});
      const $forks=createAndAppend          ('p',$leftSide,{class:'forks'});
      const $updated=createAndAppend        ('p',$leftSide,{class:'updated'});
      const $description=createAndAppend    ('p',$leftSide,{class:'description'});
      const $contribute=createAndAppend     ('p',$rightSide,{html:'</h5><center>Contributions<center></h5>', class:'contHeader'});
      // const $contributorList=createAndAppend('ul',$rightSide,{class:"contributor-list"});
// console.log(contData);
      //Initialize the first option  I'll find  a solution later !   :)
      $repository.innerHTML='<h4>Repository:</h4>'+ "<a>"+data[0].name +"</a>";
        document.querySelector('a').setAttribute("href","<h5>"+data[0].html_url+"</h5>");
        document.querySelector('a').setAttribute("target","_blank");
        $forks.innerHTML='<h4>Forks: </h4>'+"<h5>"+data[0].forks+"</h5>";
        $updated.innerHTML='<h4>Updated: </h4>'+"<h5>"+new Date(data[0].updated_at)+"</h5>";
        if(data[0].description===null)
        $description.innerHTML='';
        else
        $description.innerHTML='<h4>Description:</h4>'+"<h5>"+data[0].description+"</h5>";

      $options.addEventListener('change', (e) => {
        $repository.innerHTML='<h4>Repository:  </h4>'+ "<a>"+data[$options.value].name +"</a>";
        document.querySelector('a').setAttribute("href",data[$options.value].html_url);
        document.querySelector('a').setAttribute("target","_blank");
        $forks.innerHTML='<h4>Forks: </h4>'+"<h5>"+data[$options.value].forks+"<h5>";
        $updated.innerHTML='<h4>Updated:  </h4>'+"<h5>"+new Date(data[$options.value].updated_at)+"<h5>";
        if(data[$options.value].description===null)
        $description.innerHTML='';
        else
        $description.innerHTML='<h4>Description : </h4>'+"<h5>"+data[$options.value].description+"<h5>";

        const $contributorsDiv = createAndAppend("div",$rightSide, {className: "contributors"});
        const $contributorsList = createAndAppend("ul", $contributorsDiv, {className: "contributors-list"});
        // console.log(contData);
        // for (contributor of contData) {
        //   const $contributorItem = createAndAppend("li", $contributorsList, {className: "contributor"});
        //   const $contributorLogin = createAndAppend("p", $contributorItem, {className: "contributor-login",html: contributor.login});
        //   console.log(contributor.login);

        // }
        console.log( 'data[$options.value].contributors_url');
    
      // fetchJSON(contributors, (err, contData) => {
      //   if (err) {
      //     createAndAppend('div', root, { html: err.message, class: 'alert-error' });
      //   } else {  
      //     for (contributor of contData) {
      //     const $contributorItem = createAndAppend("li", $contributorsList, {className: "contributor"});
      //     const $contributorLogin = createAndAppend("p", $contributorItem, {className: "contributor-login",html:contributor.login});
      //     console.log(contributor.login);
      //       console.log(contributor);
      //       console.log(contData);
      //   }

      // }
      // });
    });
      data.forEach(t=>{
        createAndAppend('option', $options, { html: t.name ,value: index})
        index=index+1; 
      });  
    }
    });
  }
  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100?token=%20d79560f1bfa67a44d1863cb48f73dde3ee40cc42';
  
  // document.querySelector('select').addEventListener('change', main(HYF_REPOS_URL));
  // const contributors = 'https://api.github.com/repos/HackYourFuture/AngularJS/contributors';

  window.onload = () => main(HYF_REPOS_URL);
    
