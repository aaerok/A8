$(document).ready(() => {
    var queryParams = new URLSearchParams(window.location.search);
    var foodTitle = queryParams.get('recipe');
    var recipe = JSON.parse(localStorage.getItem("recipes")).filter((recipe) => {
        return recipe.food === foodTitle;
    });
    
    var source = $("#recipe-solo-template").html();
    var template = Handlebars.compile(source);
    var parentDiv = $("#recipe-solo");
    var instructions = recipe[0]["description"].split('.');
    //console.log(instructions)
    var list = "";
    var i = 1;
    instructions.forEach(item => {
        list += "<b><li>" + i++ + ")"+ item + "</li></b>";
    });
    $('#instructions').append(list);


    var html = template(recipe[0]);
    parentDiv.append(html);

    var recipes = [];
    if (localStorage.getItem('saved-recipes') != null) {
        recipes = JSON.parse(localStorage.getItem('saved-recipes'));
    }
    var bool = false;
    recipes.forEach(r => {
        if (r[0]["food"] === recipe[0]["food"]) bool = true;
    });
    $('#save-recipe').click(() => {
        $('#save-recipe').toggleClass('.recipe-added');
        if ($('#save-recipe').hasClass('.recipe-added')) {
            if (!bool) recipes.push(recipe);
                $('#save-recipe').text('Saved');
                $('#save-recipe').css('background-color', 'green');
        } else {
            $('#save-recipe').css('background-color', '#17a2b8');
            $('#save-recipe').text('Save');
            recipes.splice(0,recipes.length - 1);
        }

        
        localStorage.setItem('saved-recipes', JSON.stringify(recipes));
        
         console.log(JSON.parse(localStorage.getItem('saved-recipes')))
        // localStorage.removeItem('saved-recipes');
    });
});