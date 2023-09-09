import Home from './Home';
import Sidebar from './Sidebar';
import List from './List';

import './styles.less';

// route pages
m.route(document.getElementById('content'), '/', {
  '/': Home,
  '/:category': List
});

// mount sidebar
m.mount(document.getElementById('sidebar'), Sidebar);
