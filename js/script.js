/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//MrAtlas

/**
 * {Personal Note: The searchBar was tough and I needed to lookup a lot of stuff :( }
 * 
 * started by selecting the header and adding the input element and the label using insertAdjacentElement
 * 
 * Then I created an emptyDivMessage and set the display to none, to show a message that the search ended with 0 results
 * 
 * I then created 2 events listener on the input, a click button for the search and the input
 *    the first input event will show results as you type characters in the search bar and transform it to lower case
 *    then i created an array called fullName that contains the student full name in backthicks using the filter method
 *       found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 *       and i used the includes method to check if the new array contains the search value found it here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 *    I then created an if statement to check if the the new array length is < 0,
 *       if it is it will take the emptyDivMessage of before and set the display property to an emtpy string
 *       doing so it will show the header No results found
 *    else set the display property to none 
 *    (I did the same with the click event)
 *    I then used the addPagination, which holds the showPage and passed the new array
 */

function searchBar(list){
   const header = document.querySelector('.header');

   const label = document.createElement('label');
   label.for = 'search';
   label.className = 'student-search';

   const span = document.createElement('span');
   span.textContent = 'Search by name';

   const input = document.createElement('input');
   input.id = 'search';
   input.placeholder = "Search by name...";

   const button = document.createElement('button');
   button.type = 'button';

   const img = document.createElement('img');
   img.src = 'img/icn-search.svg';
   img.alt = 'Search icon';

   button.appendChild(img);
   label.appendChild(span);
   label.appendChild(input);
   label.appendChild(button);

   header.insertAdjacentElement('beforeend', label);


   const emptyDivMessage = document.createElement('div');
   emptyDivMessage.className = "empty-div";
   const emptyMessage = document.createElement('h1');
   emptyMessage.textContent = "No results found!";
   emptyMessage.className = 'emptyMessage';
   emptyDivMessage.appendChild(emptyMessage);
   emptyDivMessage.style.display = 'none';
   header.insertAdjacentElement('afterend', emptyDivMessage);

   input.addEventListener('input', () => {
      const searchTerm = input.value.toLowerCase();
      const filteredList = list.filter(student => {
        const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
        return fullName.includes(searchTerm);
      });

      if(!filteredList.length){
         emptyDivMessage.style.display = "";
      }else{
         emptyDivMessage.style.display = 'none';
      }

      addPagination(filteredList);
    }); 

   button.addEventListener('click', () => {
      const searchItem = input.value.toLowerCase();
      
      const filteredList = list.filter(student => {
        const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
        return fullName.includes(searchItem);
      });

      if(!filteredList.length){
         emptyDivMessage.style.display = "";
      }else{
         emptyDivMessage.style.display = 'none';
      }
  
      addPagination(filteredList);
    });

   addPagination(list);
}



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/**
 * I decided to create a ul variable to select it and append the data 
 * in the if statement I decided to create first all the elemnts i need and then add them to the page in the correct order
 * I thought about creating a function to do so, maybe I will do it later to clean the code
 * 
 */

function showPage(list, page){
   
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   const ul = document.querySelector('.student-list');

   ul.innerHTML = '';

   for (let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
         const li = document.createElement('li');
         li.className = 'student-item cf';

         const div = document.createElement('div');
         div.className = 'student-details';

         const avatar = document.createElement('img');
         avatar.className = 'avatar';
         avatar.src = list[i].picture.large;
         avatar.alt = "Profile Picture";

         const studentName = document.createElement('h3');
         studentName.textContent = `${list[i].name.first} ${list[i].name.last}`;

         const spanEmail = document.createElement('span');
         spanEmail.className = 'email';
         spanEmail.textContent = list[i].email;

         const joinedDetailsDiv = document.createElement('div');
         joinedDetailsDiv.className = 'joined-details';

         const spanDate = document.createElement('span');
         spanDate.className = 'date';
         spanDate.textContent = `Joined ${list[i].registered.date}`;

         div.appendChild(avatar);
         div.appendChild(studentName);
         div.appendChild(spanEmail);

         joinedDetailsDiv.appendChild(spanDate);

         li.appendChild(div);
         li.appendChild(joinedDetailsDiv);

         ul.insertAdjacentElement('beforeend', li);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/**
 * First I used Math.ceil to round up the number of pages, by doing the length of list(data) divided by the number of elemnts per page
 * then in the for loop I created the lements and added them to the 'ul'
 * added the class 'active' to the first button by using the querySelector('button')
 *    which finds the selects the first button element
 * 
 * Then the eventListener checks if the e(event) tagname is a button
 *    selects the activeButton with the querySelector
 *    and removes the active class
 *    then adds the class 'active' to the clicked button
 *    gets the current page by getting the button text
 *    calls the showPage(list, currentPage)
 * 
 * I also needed to call the showPage() outside of the eventListener so that when the page laods it will show the
 *    first 9 students
 */

function addPagination(list){

   const itemsPerPage = 9;
   const pages = Math.ceil(list.length / itemsPerPage);

   const ul = document.querySelector('.link-list');
   ul.innerHTML = '';

   for (let i = 1; i <= pages; i++){

      const li = document.createElement('li');
      
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = i;

      li.appendChild(button);
      ul.insertAdjacentElement('beforeend', li);
   }

   const firstPageButton = ul.querySelector('button');
   if (firstPageButton){
      firstPageButton.className = 'active';
   }

   ul.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON'){
         const activeButton = ul.querySelector('.active');
         if(activeButton){
            activeButton.classList.remove('active');
         }
         e.target.className = 'active';
         const currentPage = parseInt(e.target.textContent);

         showPage(list, currentPage);
      }
   })
   showPage(list, 1);
}


// Call functions
/**
 * I called searchBar() because it will automatically call the addPagination() with a new array each time there is a search
 * then the addPagination() will call the showPage
 */
searchBar(data);
