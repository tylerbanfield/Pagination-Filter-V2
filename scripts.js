const studentItem = $('.student-item');
const addPagination = '<div class="add-pagination"><ul></ul></div>';
const studentArray = pages(studentItem);

//Generate arrays of students (no more than 10 per page)
function pages(list) {
  const oldList = list.slice(0);
  const pagesArray = [];
  while(oldList.length) {
    pagesArray.push(oldList.splice(0,10));
  }
  return pagesArray;
};

//Show all students on the current page and then hides the rest
function showPages(pageNum, pageList) {
  $('.student-list li').hide();
  $.each(pageList, function(index, page){
    if (pageNum === index) {
      $.each(page, function(i, listItem){
        $(listItem).fadeIn('fast');
      })
    }
  })

};

//Create page links and display the proper list of students based on link clicked
function appendButtons(pageList) {
  $('.page').append(addPagination);
  const listLength = pageList.length;
  for ( i = 1; i <= listLength; i++ ) {
    const buttons = '<li><a href="#">' + i + '</a></li>';
    $('.add-pagination ul').append(buttons);
  }
  const paginationA = $('.add-pagination ul li a');
  paginationA.first().addClass('active');

  //Add click listeners
  paginationA.on('click', function(e) {
    const pageSelection = parseInt($(this)[0].text) - 1;
    showPages(pageSelection, pageList);
    paginationA.removeClass();
    $(this).addClass('active');
    e.preventDefault();
  });
};

//Inits
appendButtons(studentArray);
showPages(0, studentArray);
