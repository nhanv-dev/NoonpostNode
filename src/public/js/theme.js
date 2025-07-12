
$(document).ready(function () {

    $('body').addClass('loading')
    setTimeout(loaderSite, 1500);

    function loaderSite() {
        $('.load-container').hide();
        $('body').removeClass('loading')
    }

    async function changeTheme(theme) {
        var navbar = document.querySelector('.navbar')
        var footer = document.querySelector('.footer')
        var posts = document.querySelectorAll('.post')
        var logo = document.querySelector('.navbar-brand img')
        if (theme === 'dark') {
            logo.src = '/images/logo-white.png'
            document.documentElement.style
                .setProperty('--white-color', '#2B2B2B')
            document.documentElement.style
                .setProperty('--blue-color', '#d9d9d9')
            document.documentElement.style
                .setProperty('--black-blue-color', '#fff')
            document.documentElement.style
                .setProperty('--black-color', '#fff')
            document.documentElement.style
                .setProperty('--grey-color', '#1d1d1d')

            navbar.style.boxShadow = 'none'
            footer.style.boxShadow = 'none'
            posts.forEach(post => {
                post.style.boxShadow = 'none'
            })
        } else {
            logo.src = '/images/logo-dark.png'

            document.documentElement.style
                .setProperty('--white-color', '#fff')
            document.documentElement.style
                .setProperty('--blue-color', '#506172')
            document.documentElement.style
                .setProperty('--black-blue-color', '#152035')
            document.documentElement.style
                .setProperty('--black-color', '#000')
            document.documentElement.style
                .setProperty('--grey-color', '#F9F9FF')
            navbar.style.boxShadow = 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            footer.style.boxShadow = 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            posts.forEach(post => {
                post.style.boxShadow = '0px 5px 20px 0px rgb(69 67 96 / 10%)'
            })
        }
    }
    $(window).on('load', function () {
        var theme = localStorage.getItem('theme') || 'light'
        if (theme === 'dark') {
            $('#toggle-theme')[0].checked = true
        } else {
            $('#toggle-theme')[0].checked = false
        }
        changeTheme(theme)
        localStorage.setItem('theme', theme)
    });

    $('#toggle-theme').on('click', function (e) {
        var theme = localStorage.getItem('theme') || 'light'
        if (theme === 'dark')
            theme = 'light'
        else
            theme = 'dark'
        changeTheme(theme)
        localStorage.setItem('theme', theme)
    })


})