// details foods.continued....
$(document).ready(function() {
  var detailsXhr = new XMLHttpRequest();
  var detailLink = localStorage.getItem("href");
  detailsXhr.open("GET", detailLink);
  detailsXhr.onload = function() {
    if (detailsXhr.status == 200) {
      callBack(detailsXhr.response);
    }
  };
  detailsXhr.send();
});

function callBack(responseData) {
  data = JSON.parse(responseData).meals;
  $("#foodName").html(data[0].strMeal);
  var img = document.createElement("img");
  img.setAttribute("src", data[0].strMealThumb);
  img.setAttribute("class", "img-fluid border border-dark p-2 shadow");
  var typed = document.createElement("h2");
  typed.setAttribute(
    "class",
    "display-4 border bg-dark text-white shadow my-3"
  );
  typed.textContent = `${data[0].strCategory}`;

  $("#imgDish").append(img);

  $("#imgDish").append(typed);
  var ing = [
    data[0].strIngredient1,
    data[0].strIngredient2,
    data[0].strIngredient3,
    data[0].strIngredient4,
    data[0].strIngredient5,
    data[0].strIngredient6,
    data[0].strIngredient7,
    data[0].strIngredient8,
    data[0].strIngredient9,
    data[0].strIngredient10,
    data[0].strIngredient11,
    data[0].strIngredient12
  ];
  var measure = [
    data[0].strMeasure1,
    data[0].strMeasure2,
    data[0].strMeasure3,
    data[0].strMeasure4,
    data[0].strMeasure5,
    data[0].strMeasure6,
    data[0].strMeasure7,
    data[0].strMeasure8,
    data[0].strMeasure9,
    data[0].strMeasure10,
    data[0].strMeasure11,
    data[0].strMeasure12
  ];
  var size = measure.length;
  var table = document.createElement("table");
  table.setAttribute("class", "table");
  for (var i = 0; i < size; i++) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    if (ing[i].length != 0) {
      td1.textContent = ing[i];
      td2.textContent = measure[i];
      tr.append(td1);
      tr.append(td2);
      table.append(tr);
    }
  }
  $("#ingredient").append(table);
  var instruction = document.createElement("p");
  instruction.setAttribute("class", "mx-3 py-3");
  instruction.textContent = data[0].strInstructions;
  var str = data[0].strYoutube;
  var splt = str.split("");
  var position = splt.indexOf("=");
  var youTubeLink =
    "https://www.youtube.com/embed/" +
    splt.splice(position + 1, str.length).join("");
  $("#instruc").append(instruction);
  var ifr = document.createElement("iframe");
  ifr.setAttribute("src", youTubeLink);
  ifr.setAttribute("width", "560");
  ifr.setAttribute("height", "320");
  ifr.setAttribute("class", "col-sm-12");
  $("#dishVideo").append(ifr);
}
