$('addBtn').on('click', () => {
  const url = window.prompt('请问你要添加的网址是啥？');
  let hUrl;
  if (url.indexOf('http') !== 0) {
    hUrl = 'https://' + url;
  }
  const $siteList = $('.siteList');
  const $lastLi = $siteList.find('li.last');
  const $li = $(`<li>
    <a href="${hUrl}">
      <div class="site">
        <div class="logo">${url[0]}</div>
        <div class="link">${url}</div>
      </div>
    </a>
  </li>`).insertBefore($lastLi);
});
