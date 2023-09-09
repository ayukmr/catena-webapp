import Cookies from 'js-cookie';
import List from './List';

// cookie input
const Input = {
  view: (vnode) => {
    const { id, type, placeholder } = vnode.attrs;

    return m('p', [
      m('input', {
        id,
        type,
        placeholder,
        value: Cookies.get(id),
      }),

      m('button', {
        onclick: () => {
          Cookies.set(id, document.getElementById(id).value);
          List.getData();
        },
        style: { marginLeft: '5px' }
      }, '⏎')
    ]);
  }
}

// home view
const Home = {
  view: () => [
    m('h1', 'Catena'),
    m('p', 'Minimalistic frontend for The Nexus'),

    m(Input, { id: 'token',  type: 'password', placeholder: 'Token' }),
    m(Input, { id: 'server', type: 'url',      placeholder: 'Server' })
  ]
};

export default Home;
