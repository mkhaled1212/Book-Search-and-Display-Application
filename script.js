async function searchBook() {
  const bookName = document.getElementById("bookNameInput").value.trim();
    const searchContainer = document.getElementById('search'); // Ensure this ID matches your HTML

  // Check if the input is empty
  if (bookName === "") {
    alert("الرجاء إدخال اسم الكتاب.");
    return;
  }

  try {
    // Fetch book data from Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}&langRestrict=ar`);
    const data = await response.json();

    // Check if any books were found
    if (data.totalItems === 0) {
      throw new Error("الكتاب غير موجود.");
    }

   
    const book = {
      name: data.items[0].volumeInfo.title,
      author: data.items[0].volumeInfo.authors ? data.items[0].volumeInfo.authors[0] : "غير معروف",
      image: data.items[0].volumeInfo.imageLinks ? data.items[0].volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150",
      info: data.items[0].volumeInfo.description ? data.items[0].volumeInfo.description : "لا توجد وصف متاح.",
      link: data.items[0].volumeInfo.infoLink // Link to the book's Google Books page
    };

    // Display book info in the card format
    displayBookInfo(book);
     searchContainer.style.display = 'none';
  } catch (error) {
    alert(error.message);
  }
}

function displayBookInfo(book) {
  const bookInfoContainer = document.getElementById("bookInfo");
  bookInfoContainer.innerHTML = `
    <div class="card">
      <h2 style="color:snow;">${book.name}</h2>
      <span>
        <img src="${book.image}" alt="صورة الكتاب">
        <p class="p1" style="color:snow;box-shadow: none;text-shadow:none;"><strong>المؤلف:</strong> ${book.author}</p>
        <p class="p2" style="color:snow;box-shadow: none;text-shadow:none;"><strong>المحتوى:</strong> ${book.info}</p>
        <a href="${book.link}" class="download-link" target="_blank" style="display: block; margin-top: 16px; color: #007bff; text-decoration: none;">تحميل</a>
      </span>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  var searchButton = document.getElementById('searchButton');
  var searchInput = document.getElementById('searchInput');
  var searchContainer = document.getElementById('searchContainer'); // Ensure you have this container defined

  searchButton.addEventListener('click', function() {
      
     searchContainer.style.display = 'none';
  }); 
});
