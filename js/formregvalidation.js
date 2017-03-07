/**
 * Created by webcoder on 6/3/17.
 */
$(document).ready(function () {
    'use strict';

    /*
    $.validator.setDefaults( {
        submitHandler: function () {

            var email = $("input#email").val();
            var password = $("input#password").val();
            /*
            $("#formulario-registro").on('submit', function (e) {
                e.preventDefault();
                resetearFormulario();
                console.log('submit');
            });
            */
    /*
            resetearFormulario();
            alert( "submitted!" );
            console.log('submit', email, password);
            $("input").removeClass("has-success");
            $('#formulario-registro').find('span').remove();

            myApp.auth().createUserWithEmailAndPassword(email, password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        error.message = "La contraseña es demasiado debil.";
                    } else if(errorCode == 'auth/email-already-in-use') {
                        error.message = "Ya existe la cuenta con el mail ingresado.";
                    }
                    else if(errorCode == 'auth/invalid-email') {
                        error.message ="Debe ingresar una direccion del correo electronico valida.";
                    }
                    else {
                        alert(errorMessage);
                    }
                    console.log(error, error.message);
                });
        }
    });
    */

    //var validator = $( "#formulario-registro" ).validate();


    function resetearFormulario() {
        $("input[type=email]").val("");
        $("input[type=password]").val("");
        $("input").removeClass("has-success");
        $('#formulario-registro').find('span').remove();
    }


    $("#formulario-registro").validate({
        submitHandler: function(form) {

            event.preventDefault();

            var str = $("form").serializeArray();
            var myJson = JSON.stringify(str);
            //$("#formulario-registro").resetForm();
            //validator.resetForm();
            resetearFormulario();
            console.log('submit');
            //form.submit();1

        },
        //onsubmit: false,

        rules: {
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


});