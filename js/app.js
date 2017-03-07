$(document).ready(function () {
    'use strict';

// Initialize Firebase

    var configuracion = {
        apiKey: "AIzaSyCrxwDbVEiQG-vhAgofYk1J8bl6kD8CGbE",
        authDomain: "login-firebase-af59f.firebaseapp.com",
        databaseURL: "https://login-firebase-af59f.firebaseio.com",
        storageBucket: "login-firebase-af59f.appspot.com",
        messagingSenderId: "861391916399"
    };
    var myApp = firebase.initializeApp(configuracion);


    function registrarUsuario(email, password, name) {
        var user = myApp.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {

                var userLoggedIn = myApp.auth().currentUser;

                // Actualizar el nombre del usuario registrado
                userLoggedIn.updateProfile({
                    displayName: name,
                    photoURL: ""
                }).then(function() {
                    console.log('se actualizo el perfil con exito');
                }, function(error) {
                    // An error happened.
                    console.log(error);
                });

                // Mostrar la notificacion de exito
                $.notify(" Usted se registro con exito!", {
                    type: "success",
                    delay: 4000,
                    animation: true,
                    animationType: "drop",
                    icon: "check",
                    close: true
                });
            })
            .catch(function(error) {
                // Manejar los errores
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    error.message = " La contraseña es demasiado debil.";
                } else if(errorCode == 'auth/email-already-in-use') {
                    error.message = " Ya existe la cuenta con el mail ingresado.";
                }
                else if(errorCode == 'auth/invalid-email') {
                    error.message =" Debe ingresar una direccion del correo electronico valida.";
                }
                else {
                    error.message = " " + error.message;
                }

                // Mostrar el mensaje de error
                $.notify(error.message, {
                    type: "danger",
                    delay: 5000,
                    animation: true,
                    animationType: "drop",
                    icon: "close",
                    close: true
                });
            });
    }

    function loguearUsuario(email, password) {
        myApp.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                redirect(home);
                console.log('usuario logueado');
            }).catch(function (error) {
                var errorCode = error.code;
                if (errorCode == 'auth/wrong-password') {
                    error.message = " La contraseña es invalida.";
                } else if(errorCode == 'auth/user-not-found') {
                    error.message = " Correo electronico invalido, no hay ningun usuario registrado con este correo electronico.";
                } else {
                    error.message = " " + error.message;
                }

                // Mostrar el mensaje de error
                $.notify(error.message, {
                    type: "danger",
                    delay: 4000,
                    animation: true,
                    animationType: "drop",
                    icon: "close",
                    close: true
                });
                console.log(error);
            });
    }


    console.log(myApp, '123');

    var home = "home.html";
    var login = "ingresar.html";

    function redirect(ruta) {
        location.assign(ruta);
    }

    function resetearFormulario() {
        $("input[type=text]").val("");
        $("input[type=email]").val("");
        $("input[type=password]").val("");
        $("input").removeClass("has-success");
        $('#formulario-registro').find('span').remove();
    }
    /*
    myApp.auth().onAuthStateChanged(function(user) {
        if (user) {
            var loggedIn = '<li><p class="navbar-text">' + user.displayName + '</p></li>';
            loggedIn += '<li><a href="#" id="logoutLink">Salir</a></li>';

            $(loggedIn).appendTo('.navbar-right');
            $('#logoutLink').click(logOff);
            console.log('Usuario logueado');
        } else {
            console.log('Usuario no logueado');
            //redirect(login);
        }
    });
    */
    /*
     Validar Formulario de Registro
     */

    // Si el documento posee el id formulario-registro
    if(document.getElementById("formulario-registro")) {
        console.log("validar registro");
        // Validar el formulario de registro
        $("#formulario-registro").validate({
            submitHandler: function(form) {
                // Prevenir submit
                event.preventDefault();
                // obtener los datos ingresados
                var email = $("input#email").val();
                var password = $("input#password").val();
                var name = $("input#name").val();

                registrarUsuario(email, password, name);
                resetearFormulario();
            },
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                }
            },
            /*
             messages: {
             firstname: "Please enter your firstname",
             lastname: "Please enter your lastname",
             username: {
             required: "Please enter a username",
             minlength: "Your username must consist of at least 2 characters"
             },
             password: {
             required: "Please provide a password",
             minlength: "Your password must be at least 5 characters long"
             },
             confirm_password: {
             required: "Please provide a password",
             minlength: "Your password must be at least 5 characters long",
             equalTo: "Please enter the same password as above"
             },
             email: "Please enter a valid email address",
             agree: "Please accept our policy"
             },
             */
            errorElement: "em",
            errorPlacement: function (error, element) {
                // Add the `help-block` class to the error element
                error.addClass( "help-block" );

                // Add `has-feedback` class to the parent div.form-group
                // in order to add icons to inputs
                element.parents( ".col-sm-7" ).addClass( "has-feedback" );

                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter(element.parent("label"));
                } else {
                    error.insertAfter(element);
                }

                // Add the span element, if doesn't exists, and apply the icon classes to it.
                if (!element.next("span")[0]) {
                    $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter(element);
                }
            },
            success: function (label,element) {
                // Add the span element, if doesn't exists, and apply the icon classes to it.
                if (!$(element).next("span")[0]) {
                    $( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter($(element));
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parents(".col-sm-7").addClass( "has-error" ).removeClass( "has-success" );
                $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parents(".col-sm-7").addClass( "has-success" ).removeClass( "has-error" );
                $(element).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
            }
        });
    }



    /*
        Validar el Formulario de Ingreso
     */

    // Si el documento posee el id formulario-ingreso
    if(document.getElementById("formulario-ingreso")) {
        console.log("validar el formulario de ingreso");
        // Validar ingreso
        $("#formulario-ingreso").validate({
            submitHandler: function(form) {
                // Prevenir submit
                event.preventDefault();
                // obtener los datos ingresados
                var email = $("input#email1").val();
                var password = $("input#login_password").val();

                loguearUsuario(email, password);

                //redirect(home);
                console.log("submitHandler Ingreso");

                //registrarUsuario(email, password, name);
                //resetearFormulario();
            },
            rules: {
                email1: {
                    required: true,
                    email: true
                },
                login_password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                /*
                 firstname: "Please enter your firstname",
                 lastname: "Please enter your lastname",
                 username: {
                 required: "Please enter a username",
                 minlength: "Your username must consist of at least 2 characters"
                 },
                 */
                login_password: {
                    required: "Este campo es obligatorio",
                    minlength: "Your password must be at least 5 characters long"
                },
                /*
                 confirm_password: {
                 required: "Please provide a password",
                 minlength: "Your password must be at least 5 characters long",
                 equalTo: "Please enter the same password as above"
                 },
                 */
                email1: {
                    required: "Please enter a valid email address",
                    email: "El correo electronico debe ser valido"
                }
                //agree: "Please accept our policy"
            },
            errorElement: "em",
            errorPlacement: function (error, element) {
                // Add the `help-block` class to the error element
                error.addClass( "help-block" );

                // Add `has-feedback` class to the parent div.form-group
                // in order to add icons to inputs
                element.parents( ".col-sm-7" ).addClass( "has-feedback" );

                // Add the span element, if doesn't exists, and apply the icon classes to it.
                if (!element.next("span")[0]) {
                    $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter(element);
                }
            },
            success: function (label,element) {
                // Add the span element, if doesn't exists, and apply the icon classes to it.
                if (!$(element).next("span")[0]) {
                    $( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter($(element));
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parents(".col-sm-7").addClass( "has-error" ).removeClass( "has-success" );
                $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parents(".col-sm-7").addClass( "has-success" ).removeClass( "has-error" );
                $(element).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
            }
        });
    }


});