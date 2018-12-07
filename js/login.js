$(document).ready(() => {
    var accounts = [
        {'username' : 'khosla123', 'password' : 'ucsd2018'},
        {'username' : 'ucsdtriton', 'password' : 'lowertuition'},
        {'username' : 'bob', 'password' : 'jones'}
    ];

    localStorage.setItem("accounts", JSON.stringify(accounts));

    $('#login-button').click(() => {

        var username = $('#username').val().toString();
        var password = $('#password').val().toString();
        var acc = JSON.parse(localStorage.getItem("accounts"));
        console.log(acc)
        var user = acc.find(u => {
            return u["username"] === username;
        });
        if (password.length !== 0 && user.length !== 0 && user["password"] === password) {
            window.location = './home.html';
        } else {
            $('.alert-danger').attr("hidden", false);
        }
    });

    
    $('#register-button').click(() => {

        var username = $('#username').val().toString();
        var password = $('#password').val().toString();
        var confirmPassword = $('#confirm-password').val().toString();
    
        if (password !== confirmPassword) {
            $('#password-mismatch').attr("hidden", false);
        } else {
            $('#password-mismatch').attr("hidden", true);
        }
        if (password.length === 0) {
            $('#empty-pw').attr("hidden", false);
        } else {
            $('#empty-pw').attr("hidden", true);
        }
        if (username.length === 0) {
            $('.alert-danger').attr("hidden", false);
            $('#empty-login').attr("hidden", false);
        } else {
            $('.alert-danger').attr("hidden", false);
            $('#empty-login').attr("hidden", true);
        }
        if (username.length !== 0 && password === confirmPassword && password.length !== 0) {
            $('.alert-danger').attr("hidden", true);
            $('.alert-success').attr("hidden", false);
            window.location = './login.html';
        }
    });
});

