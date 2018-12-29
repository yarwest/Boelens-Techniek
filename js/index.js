const items = Array.from(document.getElementsByClassName('collapsibleList'));
items.forEach(element => {
  Array.from(element.children).forEach(child => {
    if (child.classList.contains('collapsibleListHeader')) {
      child.addEventListener('click', function(e) {
        if (element.classList.contains('selected')) {
          element.classList.remove('selected');
        } else {
          if(items.find(item => item.classList.contains('selected')) !== undefined) {
            items.forEach(itemList => {
              itemList.classList.remove('selected');
            });
            setTimeout(function() {element.classList.add('selected')}, 500);
          } else {
            element.classList.add('selected');
          }
        }
      });
    }
  });
});
