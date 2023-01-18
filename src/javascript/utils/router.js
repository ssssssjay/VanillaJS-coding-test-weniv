class Router {
  // const router = new Router({
  //   '/': ProductPage,
  //   '/detail': ProductDetail
  // });
  constructor(routes) {
    if (!routes) {
      console.error('need routes!');
    }
    this.routes = routes;
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
    const [_, routeName, ...param] = pathname.split('/');
    let page = '';

    if (this.routes[pathname]) {
      // const component = new ProductDetail;
      // prettier-ignore
      const component = new this.routes[pathname];
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
