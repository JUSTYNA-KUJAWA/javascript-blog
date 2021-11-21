'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  
  /*[DONE]  remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');
  for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  let elementAttribute = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(elementAttribute);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  } 
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  //optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.author-name'

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML= '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */ /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
   
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
      link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags){
  const params = { max : 0, min : 999999 };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }

    if (tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(`${tag} 'is used' ${tags[tag]} 'times'`);
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagListWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const htmlLink = '<li><a href="#tag-' + tag + '" class="active">' + tag + '</a></li>';
      /* add generated code to html variable */
    html = html + ' ' + htmlLink;
    /* [NEW] check if this link is NOT already in allTags */
    if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
      allTags[tag] = 1;
    } else {
      allTags[tag]++;
    }
    /* END LOOP: for each tag */
    }
  /* insert HTML of all the links into the tags wrapper */
  tagListWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }    
     /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  let allTagsHTML = '';
 /* [NEW] START LOOP: for each tag in allTags: */
 for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const taglinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' ' + '</a></li>'
    console.log('taglinkHTML:', taglinkHTML)
    allTagsHTML += taglinkHTML
    /* [NEW] END LOOP: for each tag in allTags: */
 }
 /*[NEW] add HTML from allTagsHTML to tagList */
 tagList.innerHTML = allTagsHTML;
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let tagActiveLink of tagActiveLinks ){
      /* remove class active */
      tagActiveLink.classList.remove('active');
      /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagHrefLinks = document.querySelectorAll('a.active[href^="#tag-"]');
   
  /* START LOOP: for each found tag link */
  for(let tagHrefLink of tagHrefLinks ){
      /* add class active */
      tagHrefLink.classList.add('active');
      /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
  
function addClickListenersToTags(){
  /* find all links to tags */
  const allTagList = document.querySelectorAll('[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let allTagElement of allTagList){
    /* add tagClickHandler as event listener for that link */
    allTagElement.addEventListener('click',tagClickHandler);
    /* END LOOP: for each link */
  }
}
  
addClickListenersToTags();
  
function generateAuthors(){
/* [NEW] create a new variable allAuthors with an empty object */
let allAuthors = {}
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
    for (let article of articles){
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-author attribute */
    const authorTags = article.getAttribute('data-author');
    //console.log(authorTags);
    /* generate HTML of the link */
    const authorlinkHTML = '<span>by </span><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a>';
    //console.log(taglinkHTML)
    /* add generated code to html variable */
    html = html + authorlinkHTML;
    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[authorTags]) {

      /* [NEW] add tag to allAuthors object */
      allAuthors[authorTags] = 1;
    } else {
      allAuthors[authorTags]++;
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    //console.log(titleList);
    /* END LOOP: for every article: */
  }
    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector(optAuthorListSelector);
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allAuthors)
    let allAuthorsHTML = '';
   /* [NEW] START LOOP: for each tag in allAuthors: */
   for(let author in allAuthors){
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorlinkHTML =  '<li><a class="' + calculateTagClass(allAuthors[author], tagsParams) + ' #author-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li> ';
      //console.log('talinkHTML:', taglinkHTML)
      allAuthorsHTML += authorlinkHTML
      /* [NEW] END LOOP: for each tag in allTags: */
   }
   /*[NEW] add HTML from allAuthorsHTML to tagList */
   authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('author was Cliked')
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href)
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author-', '');
  /* find all tag links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (let authorLink of authorLinks) {
      /* remove class active */
      authorLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let authorLinkHref of authorLinksHref) {
    /* add class active */
     authorLinkHref.classList.add('active');
       /* END LOOP: for each found tag link */
   }
/* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const allLinkstoAuthors = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let link of allLinkstoAuthors) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();