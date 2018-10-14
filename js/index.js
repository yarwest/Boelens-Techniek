Array.from(document.getElementsByClassName('collapsibleList')).forEach(element => {
  Array.from(element.children).forEach(child => {
    if (child.classList.contains('collapsibleListHeader')) {
      child.addEventListener('click', function(e) {
        if (element.classList.contains('selected')) {
          element.classList.remove('selected');
        } else {
          Array.from(document.getElementsByClassName('collapsibleList')).forEach(itemList => {
            itemList.classList.remove('selected');
          });
          element.classList.add('selected');
        }
      });
    }
  });
});
