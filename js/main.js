$(document).ready(function(){

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

    // Handle Perpindahan Page
    if(!localStorage.getItem('token')) {
        $('#register-page').hide()
        $('.navbar').hide()
        $('#home-page').hide()
        $('#crud-page').hide()

        $('#register-button').click(function(event){
            $('#register-page').show()
            $('.navbar').hide()
            $('#login-page').hide()
            event.preventDefault()
        })
        $('#login-button').click(function(event){
            $('#register-page').hide()
            $('.navbar').hide()
            $('#login-page').show()
            event.preventDefault()
        })
    } else {
        $('#register-page').hide()
        $('#crud-page').show()
        $('#login-page').hide()
        $('.navbar').show()
        $('#home-page').hide()

        

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
        event.preventDefault
        $('#home-page').show()
        $('#register-page').hide()
        $('.navbar').show()
        $('#login-page').hide()
        localStorage.setItem('token','ichlas')
    })

    $('#register-form').on('submit', function(event){
        event.preventDefault
        $('#home-page').hide()
        $('#register-page').hide()
        $('.navbar').hide()
        $('#login-page').show()
    })

    $('#logout-nav').click(function(event){
        event.preventDefault
        localStorage.removeItem('token')
        $('#home-page').hide()
        $('#register-page').hide()
        $('.navbar').hide()
        $('#login-page').show()

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
        let query = 'oatmeal'
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

    // Button send message di contact developer

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

