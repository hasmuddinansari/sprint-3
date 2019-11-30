// on load page....
$(document).ready(function() {
  xhrRequest(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=indian",
    "#foods",
    false
  );
  //random foods
  for (var i = 0; i < 4; i++) {
    xhrRequest(
      "https://www.themealdb.com/api/json/v1/1/random.php",
      "#randomFoods",
      false
    );
  }
});

//search function
$("#searchBtn").click(function() {
  var searchVal = $("#searchForm").val();
  var searchLink =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchVal;
  xhrRequest(searchLink, "#foods", true, searchVal, "#type");
});

//filter function
$("#country").change(function() {
  var countryVal = $("#country").val();
  var countryLink =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + countryVal;
  xhrRequest(countryLink, "#foods", true, countryVal, "#type");
});

// search by letter
$(".letter").click(function() {
  var letterVal = $(this).val();
  var letterLink = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letterVal}`;
  xhrRequest(letterLink, "#foods", true, `Search for "${letterVal}"`, "#type");
});

function xhrRequest(url, location, printAnywhere, headValue, whereToPrint) {
  $("#foods").empty();
  var xhr = new XMLHttpRequest();
  var method = "GET";
  xhr.open(method, url);
  xhr.onload = function() {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.response).meals;
      var dataLength = data.length;
      callBack(location, data, dataLength);
      if (printAnywhere) {
        displayHeading(headValue, whereToPrint);
      }
    }
  };
  xhr.send();
}
//display if You have any headings to print;
function displayHeading(value, location) {
  $(location).html(value.toUpperCase());
}

// callBack Function

function callBack(location, data, dataSize) {
  var locationPlace = $(location);
  for (var i = 0; i < dataSize; i++) {
    var div = document.createElement("div");
    div.setAttribute(
      "class",
      "col-lg-3 col-md-4 col-sm-6 col-12 font-weight-bold text-center"
    );
    para = document.createElement("a");
    para.textContent = data[i].strMeal;
    para.setAttribute(
      "href",
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data[i].idMeal}`
    );
    para.setAttribute("class", "bg-dark px-2 text-white");
    var img = document.createElement("img");
    imgSrc = data[i].strMealThumb;
    img.setAttribute("src", imgSrc);
    img.setAttribute("alt", "foods");
    img.setAttribute(
      "class",
      "img-fluid border border-dark rounded shadow p-1 bg-white rounded"
    );
    div.append(img);
    div.append(para);
    $(locationPlace).append(div);
    addList();
  }
}

// //details page
function addList() {
  document.querySelectorAll("a").forEach(function(a) {
    a.addEventListener("click", showDetail);
  });
}
function showDetail(e) {
  e.preventDefault();
  var attr = e.target.getAttribute("href");
  attr.toString();
  localStorage.setItem("href", attr);
  location.href = "/details.html";
}
