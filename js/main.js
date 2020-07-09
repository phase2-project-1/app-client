$(document).ready(function(){
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
        $('#crud-page').hide()
        $('#login-page').hide()
        $('.navbar').show()
        $('#home-page').show()

        $('#crud-nav').click(function(event){
            $('#about-nav').hide()
            $('#developer-nav').hide()
            $('#contact-nav').hide()
            $('#home-page').hide()
        })

        $('#home-nav').click(function(event){
            $('#about-nav').show()
            $('#developer-nav').show()
            $('#contact-nav').show()
            $('#home-page').show()
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

    //about
    // $( window ).on('load', function(){
    //     $('.pKiri').addClass('pMuncul');
    //     $('.pKanan').addClass('pMuncul');
    //     console.log('ok')
    // });
})

