function toggleAddCategory() {
    var categorySelect = document.getElementById("categorySelect");
    var newCategoryInput = document.getElementById("newCategory");
    var addCategoryButton = document.getElementById("addCategoryButton");
    
    categorySelect.style.display = "none";
    newCategoryInput.style.display = "inline-block";
    newCategoryInput.value = "";
    addCategoryButton.disabled = true;
  }
  
  function saveBookmark() {
    var title = document.getElementById("title").value;
    var webAddress = document.getElementById("webAddress").value;
    var categorySelect = document.getElementById("categorySelect");
    var newCategoryInput = document.getElementById("newCategory");
    var webAddressError = document.getElementById("webAddressError");
    
    // Reset error message
    webAddressError.textContent = "";

    if (title.length > 30) {
      webAddressError.textContent = "Max 30 char allowed for titles";
      return;
    }
    
    // Web address validation
    var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(webAddress)) {
      webAddressError.textContent = "Invalid web address";
      return;
    }
    
    // Check if the web address is unique
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    var duplicateBookmark = bookmarks.find(function(bookmark) {
      return bookmark.webAddress === webAddress;
    });
    if (duplicateBookmark) {
      webAddressError.textContent = "Web address already exists";
      return;
    }
    
    var category;
    
    if (categorySelect.style.display === "none") {
      category = newCategoryInput.value.trim();
      
      // Check if the category is unique
      var existingCategories = Array.from(categorySelect.options).map(option => option.value);
      if (existingCategories.includes(category)) {
        webAddressError.textContent = "Category already exists";
        return;
      }
    } else {
      category = categorySelect.value;
    }
    
    // Create a bookmark object
    var bookmark = {
      title: title,
      webAddress: webAddress,
      category: category
    };
    
    // Add the new bookmark to the array
    bookmarks.push(bookmark);
    
    // Store the updated bookmarks array in local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    
    // Show a confirmation message
    alert("Bookmark saved!");
  }
  
  function closePopup() {
    window.close();
  }