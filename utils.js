const showMore = (id) => {
  //removes the link
  document.getElementById(`show-more-${id}`).style.display = 'none';
  document.getElementById(`dots-${id}`).style.display = 'none';
  document.getElementById(`show-less-${id}`).style.display = 'inline';

  document.getElementById(`more-${id}`).style.display = 'inline';
};

const showLess = (id) => {
  document.getElementById(`show-less-${id}`).style.display = 'none';
  document.getElementById(`more-${id}`).style.display = 'none';

  document.getElementById(`show-more-${id}`).style.display = 'inline';
  document.getElementById(`dots-${id}`).style.display = 'inline';
};

export { showMore, showLess };
