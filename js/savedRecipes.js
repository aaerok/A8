$(document).ready(() => {
    var recipes = JSON.parse(localStorage.getItem('saved-recipes'));

    // console.log(recipes);

    var source = $("#saved-recipes-template").html();
    var template = Handlebars.compile(source);
    var parentDiv = $("#saved-recipes");


    for (let i = 0; i < recipes.length; i++) recipes[i][0]['index'] = i;
    console.log(recipes);
    
    recipes.forEach(recipe => {
        var html = template(recipe[0]);
        parentDiv.append(html);
    });

    for (let i = 0; i < recipes.length; i++) {
        $('#delete' + i).click(() => {
            $('#card' + i).hide();
            var arr = JSON.parse(localStorage.getItem("saved-recipes")).filter( (elem) => {
                // console.log(elem[0]['food'] , recipes[i][0]['food'])
                // console.log(i === recipes[i][0]['index'])
                return elem[0]['food']  !== recipes[i][0]['food'];
            });
            //    console.log(arr)
              if (arr.length === 0) {
                localStorage.removeItem("saved-recipes");
              } else {
                localStorage.setItem('saved-recipes', JSON.stringify(arr));
              }
        });
    }
        
    
});