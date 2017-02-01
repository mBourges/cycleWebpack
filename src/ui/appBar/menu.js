div('ui.vertical.inverted.sidebar.menu.left.overlay.animating.visible', [
          div('.item', [
              div('.menu', [
                a('.item .navLink', { props: { href: '/' } }, 'Home'),
              ])
            ])
        ])


div('.ui .vertical .inverted .sticky .menu', [
    div('.item', [
      div('.menu', [
        a('.item .navLink', { props: { href: '/' } }, 'Home'),
      ])
    ]),
    div('.item', [
      div('.header', 'Students'),
      div('.menu', [
        a('.item .navLink', { props: { href: '/student' } }, 'search'),
        a('.item .navLink', { props: { href: '/inquiry/new' } }, 'New Toiawase'),
      ])
    ])
  ])