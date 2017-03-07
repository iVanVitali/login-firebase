/**
 * Created by webcoder on 7/3/17.
 */
$(document).ready(function () {
    'use strict';

    const auth = firebase.auth();

    var index = "index.html";
    var home = "home.html";
    var login = "ingresar.html";

    function redirect(ruta) {
        location.assign(ruta);
    }

    function salir() {
        auth.signOut().then(function() {
            console.log('Usuario deslogueado!');
            //unsetAppCookie;
            redirect(index);
        }, function(error) {
            // An error happened.
            console.log('Error al salir', error);
        });
    }

    auth.onAuthStateChanged(function(user) {
        if (user) {
            redirect(home);
        } else {
            //console.log('Usuario no logueado');
        }
    });

});