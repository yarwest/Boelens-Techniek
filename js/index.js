Array.from(document.getElementsByClassName('collapsibleList')).forEach(element => {
  console.log(element);
  element.addEventListener('click', function(e) {
    Array.from(document.getElementsByClassName('collapsibleListItems')).forEach(itemList => {
      itemList.classList.add('hidden');
    });
    Array.from(element.children).forEach(child => {
      if (child.classList.contains('collapsibleListItems')) {
        child.classList.remove('hidden');
      }
    });
  });
});
