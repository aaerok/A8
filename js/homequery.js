$(document).ready( () => {
    var items = JSON.parse(localStorage.getItem("ingredients"));
    console.log(items);
    var source = $("#list-template").html();
    var template = Handlebars.compile(source);
    var parentDiv = $(".home-list");
    var fullItems = JSON.parse(localStorage.getItem('full-items'));
    if (!items || items.length === 0) {
        $('#container span').text('You have no ingredients.');
        $('#delete-all').hide();
    } else {
        $('#delete-all').show();
        for (let i = 0; i < items.length; i++) {
            var singleItem = fullItems.find(u => {
                return u.food === items[i];
            });
            var f = {
                'food' : items[i],
                'index' : i,
                'pic' : singleItem['pic']
            }
            var html = template(f);
            parentDiv.append(html);
            $('#delete-item' + i).click(() => {
                var arr = items.filter( (elem) => {
                    return elem !== items[i];
                });
                localStorage.setItem("ingredients", JSON.stringify(arr));
                location.reload();
            });
        }
    }

    $('#delete-all').click(() => {
        localStorage.removeItem("ingredients");
        location.reload();
    });
      
      
});