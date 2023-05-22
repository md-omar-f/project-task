    // Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    
    // Group bookmarks by category
    var groupedBookmarks = {};
    bookmarks.forEach(function(bookmark) {
      if (!groupedBookmarks[bookmark.category]) {
        groupedBookmarks[bookmark.category] = [];
      }
      groupedBookmarks[bookmark.category].push(bookmark);
    });
    
    // Create HTML markup for categorized bookmarks
    var bookmarksContainer = document.getElementById("bookmarksContainer");
    for (var category in groupedBookmarks) {
      var categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");
      
      var categoryHeading = document.createElement("h2");
      categoryHeading.textContent = category;
      categoryDiv.appendChild(categoryHeading);
      
      var bookmarkList = document.createElement("ul");
      bookmarkList.classList.add("bookmark-list");
      
      groupedBookmarks[category].forEach(function(bookmark) {
        var bookmarkItem = document.createElement("li");
        bookmarkItem.classList.add("bookmark-item");
        
        var bookmarkTitle = document.createElement("span");
        bookmarkTitle.classList.add("bookmark-title");
        bookmarkTitle.textContent = bookmark.title;
        
        var bookmarkUrl = document.createElement("a");
        bookmarkUrl.classList.add("bookmark-url");
        bookmarkUrl.href = bookmark.webAddress;
        bookmarkUrl.textContent = bookmark.webAddress;
        
        var viewDetailsBtn = document.createElement("button");
        viewDetailsBtn.textContent = "Details";
        viewDetailsBtn.addEventListener("click", function() {
          showBookmarkDetails(bookmark);
        });
        
        bookmarkItem.appendChild(bookmarkTitle);
        //bookmarkItem.appendChild(document.createTextNode(" - "));
        //bookmarkItem.appendChild(bookmarkUrl);
        bookmarkItem.appendChild(viewDetailsBtn);
        
        bookmarkList.appendChild(bookmarkItem);
      });
      
      categoryDiv.appendChild(bookmarkList);
      
      bookmarksContainer.appendChild(categoryDiv);
    }
    
    // Show bookmark details
    function showBookmarkDetails(bookmark) {
      var detailsContainer = document.getElementById("detailsContainer");
      var detailsContent = document.getElementById("detailsContent");
      
      detailsContent.innerHTML = "";
      detailsContent.appendChild(createDetailElement("Title", bookmark.title));
      detailsContent.appendChild(createDetailElement("Web Address", bookmark.webAddress));
      detailsContent.appendChild(createDetailElement("Category", bookmark.category));
      
      detailsContainer.classList.remove("hidden");
    }
    
    // Create a detail element for displaying bookmark details
    function createDetailElement(label, value) {
      var detailElement = document.createElement("div");
      detailElement.innerHTML = "<strong>" + label + ":</strong> " + value;
      return detailElement;
    }

    function openPopup() {
      window.open('save-bookmark.html', '_blank', 'width=1000,height=500');
    }