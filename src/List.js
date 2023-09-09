import Cookies from 'js-cookie';
import sanitizeHtml from 'sanitize-html';

// list routes
const routes = {
  highlights:       { category: 20034, type: 'news',         title: 'Highlights'        },
  communityMessage: { category: 20052, type: 'news',         title: 'Community Message' },
  deansWeeklies:    { category: 7261,  type: 'announcement', title: "Deans' Weeklies"   },

  actionRequired:     { category: 20967, type: 'list', title: 'Action Required'     },
  newAnnouncements:   { category: 20968, type: 'list', title: 'New Announcements'   },
  questCorner:        { category: 21148, type: 'list', title: 'Quest Corner'        },
  clubAnnouncements:  { category: 20970, type: 'list', title: 'Club Announcements'  },
  clubInformation:    { category: 21027, type: 'list', title: 'Club Information'    },
  stucoNews:          { category: 20969, type: 'list', title: 'StuCo News'          },
  stucoElectionInfo:  { category: 21018, type: 'list', title: 'StuCo Election Info' },
  evergreenResources: { category: 21098, type: 'list', title: 'Evergreen Resources' },
  staffContacts:      { category: 20966, type: 'list', title: 'Staff Contacts'      },
  seekingHelp:        { category: 20954, type: 'list', title: 'Seeking Help'        }
}

// list view
const List = {
  // list data
  data: Object.fromEntries(
    Object.entries(routes)
      .map(([route]) => [route, []])
  ),

  // get data
  getData: () => {
    if (Cookies.get('token') && Cookies.get('server')) {
      Object.entries(routes)
        .map(([route, { category, type }]) => {
          List.request(`items/${type}/${category}`)
            .then((data) => {
              // throw error on invalid token
              if ('Error' in data) {
                throw Error('invalid token');
              }

              if (routes[route].type === 'news') {
                // get item descriptions
                List.getDescriptions(data);
              }

              List.data[route] = data;
            });
        });
    }
  },

  // get item descriptions
  getDescriptions: (data) => {
    data.forEach((item) => {
      if (item.Description === 'yes') {
        List.request(`detail/${item.Id}`)
          .then((data) => {
            item.Description = data.Description;
          });
      }
    });
  },

  // create request
  request: (path) => (
    m.request({
      url: `${Cookies.get('server')}/${path}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
  ),

  // show view
  view: (vnode) => {
    const { category } = vnode.attrs;
    const isList = routes[category].type === 'list';

    return [
      m('h2', { style: { fontSize: '24px' } }, routes[category].title),

      // show items
      List.data[category].map((item) => (
        m('details', [
          m('summary', isList ? item.Title : item.Name),

          // item description
          m('div', {
            innerHTML: sanitizeHtml(
              isList ? (item.LongDescription || item.ShortDescription) : item.Description,
              {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
              }
            )
          })
        ])
      ))
    ]
  }
};

// get data
List.getData();
setInterval(List.getData, 60**3);

export default List;
export { routes };
