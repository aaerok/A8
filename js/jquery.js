$(document).ready( () => {

    var items = [
        {'food' : 'Apple', 'pic' : '../imgs/ingredients/apple.jpg', 'index': 0},
        {'food' : 'Banana', 'pic' : '../imgs/ingredients/banana.jpg', 'index': 1},
        {'food' : 'Tomato', 'pic' : '../imgs/ingredients/tomato.jpg', 'index': 2},
        {'food' : 'Steak', 'pic' : '../imgs/ingredients/steak.jpg', 'index': 3},
        {'food' : 'Spaghetti', 'pic' : '../imgs/ingredients/spaghetti.jpg', 'index': 4},
        {'food' : 'Marinara', 'pic' : '../imgs/ingredients/marinara.jpg', 'index': 5},
        {'food' : 'Rice', 'pic' : '../imgs/ingredients/rice.jpg', 'index' : 6},
        {'food' : 'Bread', 'pic' : '../imgs/ingredients/bread.jpg', 'index' : 7},
        {'food' : 'Chicken', 'pic' : '../imgs/ingredients/chicken.jpg', 'index' : 8},
        {'food' : 'Yogurt', 'pic' : '../imgs/ingredients/yogurt.jpg', 'index' : 9},
        {'food' : 'Meatballs', 'pic' : '../imgs/ingredients/meatballs.jpg', 'index': 10},
        {'food' : 'Garlic', 'pic' : '../imgs/ingredients/garlic.jpg', 'index': 11},
        {'food' : 'Eggs', 'pic' : '../imgs/ingredients/eggs.jpg', 'index': 12},
        {'food' : 'Cabbage', 'pic' : '../imgs/ingredients/cabbage.jpg', 'index': 13},
        {'food' : 'Broccoli', 'pic' : '../imgs/ingredients/broccoli.jpg', 'index': 14},
        {'food' : 'Potato', 'pic' : '../imgs/ingredients/potato.jpg', 'index': 15},

    ];

    var suggested = [
        {'food' : 'Eggs','index': 0},
        {'food' : 'Cabbage', 'index': 1},
        {'food' : 'Chicken', 'index': 2},
        {'food' : 'Banana', 'index': 3},
        {'food' : 'Bread', 'index': 4},
        {'food' : 'Rice', 'index': 5},
        {'food' : 'Tomato', 'index' : 6},
        {'food' : 'Spaghetti', 'index' : 7},
        {'food' : 'Steak', 'index' : 8},
    ];

    localStorage.setItem("full-items", JSON.stringify(items));

    for (let i = 0; i < suggested.length; i++) {
        $("#" + i).click(() => {
            $('#' + i).toggleClass('item-added');
            if ($('#' + i).hasClass('item-added')) {
                $('#checks' + i).attr('hidden', false);
                addItem(suggested[i].food);
            } else {
                $('#checks' + i).attr('hidden', true);
                removeItem(suggested, i);
            }
        });
    } 
    
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var parentDiv = $("#item-search-parent");
    for (let i = 0; i < items.length; i++) {
        parentDiv.append(template(items[i]));
        $('#item-button' + i).hide();
    }
    $('.search-box').keyup( (e) => {
        var input = $('.search-box').val().toLowerCase();
        if (input.length === 0) {
            $("#suggestions").show();
            $("#suggestions-title").show();
        } else {
            $("#suggestions").hide();
            $("#suggestions-title").hide();
        }
        items.forEach((item) => {
            if (item.food.toLowerCase()[0] === input[0] && item.food.toLowerCase().includes(input) && input.length != 0) {
                $('#item-button' + item.index).show();
            } else {
                $('#item-button' + item.index).hide();
            }
        });
    });

    for (let i = 0; i < items.length; i++) {
        $('#item-button' + i).click(() => {
            $('#item-button' + i).toggleClass('item-added');
            if ($('#item-button' + i).hasClass('item-added')) {
                $('#check' + i).attr('hidden', false);
                addItem(items[i].food);
            } else {
                $('#check' + i).attr('hidden', true);
                removeItem(items, i);
            }
        });
    }
});

function addItem(data) {
    var arr = JSON.parse(localStorage.getItem("ingredients"));
    if (!arr) arr = [];
    if (!arr.includes(data)) arr.push(data);
    localStorage.setItem("ingredients", JSON.stringify(arr));
}

function removeItem(items, index) {
    var arr = JSON.parse(localStorage.getItem("ingredients")).filter( (elem) => {
        return JSON.stringify(elem) !== JSON.stringify(items[index].food);
    });
    localStorage.setItem("ingredients", JSON.stringify(arr));
}
