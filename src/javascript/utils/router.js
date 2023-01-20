class Router {
  // const router = new Router({
  //   '/': ProductPage,
  //   '/detail': ProductDetail // 얘는 필요가없다(위에서 걸려야 한다)
  // });
  constructor(routes) {
    if (!routes) {
      console.error('need routes!');
    }
    this.routes = routes;
    // console.log(routes);

    for (const key in routes) {
      // console.log(key);
      const route = routes[key];
      // console.log(route);
      // console.log(key.indexOf(':'));
      if (key.indexOf(':') > -1) {
        const [_, routeName, param] = key.split('/');
        this.routes['/' + routeName] = route;
        // console.log(key);
        // console.log(this.routes[key]);
        delete this.routes[key];
      }
    }
    // console.log(this.routes);
  }

  init(rootElementId) {
    if (!rootElementId) {
      console.error('need root element id!!');
    }
    this.rootElementId = rootElementId;

    // 메인 뒤에 슬래시로 따라붙는 애들
    this.routing(window.location.pathname);

    window.addEventListener('click', (e) => {
      e.preventDefault();
      // TODO: 전역에 이벤트가 걸려있는 현상 해결
      this.routePush(e.target.href);
    });

    // 뒤로가기 버튼 눌렀을때
    window.onpopstate = () => this.routing(window.location.pathname);
  }

  routePush(pathname) {
    window.history.pushState({}, null, pathname);
    this.routing(window.location.pathname);
  }

  routing(pathname) {
    const [_, routeName, param] = pathname.split('/');
    let page = '';

    if (this.routes[pathname]) {
      // const component = new ProductDetail;
      // prettier-ignore
      const component = new this.routes[pathname];
      page = component.render();
    } else if (param) {
      const component = new this.routes['/' + routeName](param);
      page = component.render();
    }

    if (page) {
      this.render(page);
    }
  }

  render(page) {
    const rootElement = document.querySelector(this.rootElementId);
    rootElement.innerHTML = '';
    rootElement.appendChild(page);
  }
}

export default Router;
