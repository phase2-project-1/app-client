const SERVER = 'http://localhost:3000'

function putEditToDo(id) {
    let title = $('#edit-title').val()
    let description = $('#edit-description').val()
    let status = $('#edit-status').val()
    let dueDate = $('#edit-duedate').val()
    $.ajax({
        method: "PUT",
        url: `${SERVER}/todos/${Number(id)}`,
        data: {
            title,
            description,
            status,
            dueDate
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            isLogin()
        })
        .fail((xhr, error, status) => {
            console.log('fail')
            console.log(xhr.responseJSON, status, error)
        })
        .always((response) => {
            console.log('always')
        })
}

function deleteToDo(id) {
    $.ajax({
        method: "DELETE",
        url: `${SERVER}/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            isLogin()
        })
        .fail((xhr, error, status) => {
            console.log('fail')
            console.log(xhr.responseJSON, status, error)
        })
        .always((response) => {
            console.log('always')
        })
}

// Oauth
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: `${SERVER}/user/login/google`,
        headers: {
            id_token
        }
    })
        .done(response => {
            let token = response.token
            localStorage.setItem('token', token)
            isLogin()
        })
        .fail((xhr, error, status) => {
            console.log('fail')
            console.log(xhr.responseJSON, status, error)
        })
        .always((response) => {
            console.log('always')
        })
}
function googleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        isLogin()
        event.preventDefault()
    });
}

$(document).ready(function(){

    

    // Handle Perpindahan Page
    if(!localStorage.getItem('token')) {
        $('#register-page').hide()
        $('.navbar').hide()
        $('#home-page').hide()
        $('#crud-page').hide()
        $('#login-page').show()

        $('#register-button').click(function(event){
            $('#register-page').show()
            $('.navbar').hide()
            $('#login-page').hide()
            $('#crud-page').hide()
            event.preventDefault()
        })
        $('#login-button').click(function(event){
            $('#register-page').hide()
            $('.navbar').hide()
            $('#login-page').show()
            $('#crud-page').hide()
            event.preventDefault()
        })
    } else {
        $('#register-page').hide()
        $('#login-page').hide()
        $('.navbar').show()
        $('#home-page').show()
        $('#add-new-recipe-nav').hide()
        $('#my-favourite-recipe-nav').hide()
        $('#crud-page').hide()

        

        $('#home-nav').click(function(event){
            $('#about-nav').show()
            $('#developer-nav').show()
            $('#contact-nav').show()
            $('#home-page').show()
            $('#add-new-recipe-nav').hide()
            $('#my-favourite-recipe-nav').hide()
        })


    }
    

    $('#login-form').on('submit', function(event){
        
        // $('#home-page').show()
        // $('#register-page').hide()
        // $('.navbar').show()
        // $('#login-page').hide()
        // localStorage.setItem('token','ichlas')

        let email = $('#email-login').val()
        let password = $('#password-login').val()

        $.ajax({
            method: "POST",
            url: `${SERVER}/user/login`,
            data: {
                email,
                password
            }
        })
            .done(response => {
                let token = response.token
                localStorage.setItem('token', token)

                $('#home-page').show()
                $('#crud-page').hide()
                $('#register-page').hide()
                $('.navbar').show()
                $('#login-page').hide()
                $('#add-new-recipe-nav').hide()
                $('#my-favourite-recipe-nav').hide()

            })
            .fail((xhr, error, status) => {
                console.log('fail')
                console.log(xhr.responseJSON, status, error)
            })
            .always((response) => {
                console.log(response)
                console.log('always')
            })
        // Ambil dari timothy
        event.preventDefault()
    })

    $('#register-form').on('submit', function(event){
        event.preventDefault()
        $('#home-page').hide()
        $('#register-page').hide()
        $('.navbar').hide()
        $('#login-page').show()


        let email = $('#email-register').val()
        let username = $('#username-register').val()
        let password = $('#password-register').val()
        $.ajax({
            method: "POST",
            url: `${SERVER}/user/register`,
            data: {
                email,
                username,
                password
            }
        })
            .done(response => {
                $('#home-page').hide()
                $('#register-page').hide()
                $('.navbar').hide()
                $('#login-page').show()
            })
            .fail((xhr, error, status) => {
                console.log('fail')
                console.log(xhr.responseJSON, status, error)
            })
            .always((response) => {
                console.log(response)
                console.log('always')
            })
        // Ambil dari timothy
    })

    $('#logout-nav').click(function(event){
        event.preventDefault
        localStorage.removeItem('token')
        $('#home-page').hide()
        $('#register-page').hide()
        $('.navbar').hide()
        $('#login-page').show()
        $('#crud-page').hide()
    })

    //Kalao tombol search ditekan maka append result dari api
    // awalnya result di hide
    $('#form-search').on('submit', function(event) {
        event.preventDefault()
        
        //hapus dulu result yang ada
        $('#result-search').empty()
        //$('#recipe-list').empty()
        //ambil query nya dulu
        let query = $('#input-query').val()
        console.log(query)
        // append dulu
        $.ajax({
            method: "GET",
            url: `https://api.spoonacular.com/recipes/search?apiKey=741076108ecd41208e68422b2e1b7e02&query=${query}`
        })
            .done(response => {
                $('#input-query').val('')
                $('#searching').show()
                response.results.forEach(item => {

                    $('#result-search').append(`
                        <div class="col-sm-4" style="margin-bottom: 40px;">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src="https://spoonacular.com/recipeImages/${item.id}-240x150.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${item.title}</h5>
                                    <p class="card-text">${item.readyInMinutes}</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    `)
                })
                $('#new').hide()
                
            })
            .fail((xhr, error, status) => {
                console.log('fail')
                console.log(xhr.responseJSON, status, error)
            })
            .always((response) => {
                console.log(response)
                console.log('always')
            })
    })
    // akhir

    // button crud nav
    $('#crud-nav').click(function(event){
        $('#about-nav').hide()
        $('#developer-nav').hide()
        $('#contact-nav').hide()
        $('#home-page').hide()
        $('#add-new-recipe-nav').show()
        $('#my-favourite-recipe-nav').show()
        $('#searching').hide()
        $('#new-recipe-api').empty()
        $('#crud-page').show()
        let query = 'oatmeal'

        // const ingredients = []

        // for(let i =0 ;i< 3;i++){
        //     ingredients.push($(`${#ingredient[i+1]}).val())
        // }

        const name = $('#recipe-name').val()
        const imageUrl = $('#imageurl').val()
        const ingredient = $('#ingredient1').val()

        $.ajax({

            method: "POST",
            url: `${SERVER}/recipe/myrecipe`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                name,
                imageUrl,
                ingredient
            }

        })
        .done(response => {
            console.log(done)
            console.log(response)

            // response.forEach( item => {
            //     $('#favourite-list').append(`
            //         <div class="col-sm-4" style="margin-bottom: 40px;">
            //             <div class="card" style="width: 18rem;">
            //                 <img class="card-img-top" src="${item.imageUrl}" alt="Card image cap">
            //                 <div class="card-body">
            //                     <h5 class="card-title">${item.name}</h5>
            //                     <p class="card-text">${item.ingredient}</p>
            //                     <button value="${item.id}" class="btn-sm edit-button">Edit</button>
            //                     <button value="${item.id}" class="btn-sm delete-button">Delete</button>
            //                 </div>
            //             </div>
            //         </div>
            //     `)
            // })
        })

            


        $.ajax({
            method: "GET",
            url: `https://api.spoonacular.com/recipes/search?apiKey=741076108ecd41208e68422b2e1b7e02&query=${query}`
        })
        .done(response=>{
            for(let i=0 ;i<3 ;i++){
                console.log(response.results[i])
                $('#new-recipe-api').append(`
                    <div class="col-sm-4" style="margin-bottom: 40px;">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="https://spoonacular.com/recipeImages/${response.results[i].id}-240x150.jpg" alt="Card image cap">
                            <div class="card-body bg-warning >
                                <h5 class="card-title text-white">${response.results[i].title}</h5>
                            </div>
                        </div>
                    </div>
                `)
            }
        })
    })




    // Button Reset di form contact developer
    $('#reset-form-button').click(event => {
        $('#email').val("")
        $('#username').val("")
        $('#kritik').val("")
        $('#saran').val("")
    })
    // Button send message di contact developer
    $('#form-contact').submit(event => {
        let email = $('#email').val()
        let username = $('#username').val()
        let kritik = $('#kritik').val()
        let saran = $('#saran').val()
        $.ajax({
            method: "POST",
            url: `${SERVER}/user/sendmail`,
            data: {
                email,
                username,
                kritik,
                saran
            }
        })
            .done(response => {
                console.log(response)
                $('#email').val("")
                $('#username').val("")
                $('#kritik').val("")
                $('#saran').val("")
                $('#home-page').show()
                $('#register-page').hide()
                $('.navbar').show()
                $('#login-page').hide()
            })
            .fail((xhr, error, status) => {
                console.log('fail')
                console.log(xhr.responseJSON, status, error)
            })
            .always((response) => {
                console.log('always')
            })
        event.preventDefault()
    })

    $('.page-scroll').on('click', function(e){
        //ambil isi href
        let tujuan = $(this).attr('href');
        //tangkap elemen yang bersangkutan
        var elemenTujuan = $(tujuan);
        
        // Animasi
        $('html,body').animate({
            scrollTop: elemenTujuan.offset().top - 50
        }, 1000, 'easeInOutExpo');
    
        // Membajak fungsi href supaya ga pindah ke tujuan
        e.preventDefault();
    
        // Swing dan Linear yang jquery punya atau Cari Jquery Easing
    
    });
})

