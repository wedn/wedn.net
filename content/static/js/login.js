$(function () {
  var $container = $('.container')

  var $toggle = $('.toggle').on('click', function() {
    var isReg = $container.stop().addClass('active')
    window.history.pushState('login', '', 'register')
    window.document.title = '注册'
  })

  var $close = $('.close').on('click', function() {
    var isReg = $container.stop().removeClass('active')
    window.history.pushState('register', '', 'login')
    window.document.title = '登录'
  })

  $(window).on('popstate', function () {
    console.log(window.history.state)
    if (window.history.state === 'login') {
      $toggle.click()
    } else {
      $close.click()
    }
  })
})
