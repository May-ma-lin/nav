const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: 'A', url: 'https://www.acfun.cn/' },
  { logo: 'B', url: 'https://www.bilibili.com' },
];

const simplifyUrl = (url) => {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

const render = () => {
  $siteList.find('li:not(.last)').remove();

  hashMap.forEach((item, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${item.logo}</div>
        <div class="link">${simplifyUrl(item.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi);
    $li.on('click', () => {
      window.open(item.url);
    });
    $li.on('click', '.close', (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$('.add-btn').on('click', () => {
  let url = window.prompt('请问你要添加的网址是啥？');
  if (url.indexOf('http') !== 0) {
    url = 'https://www.' + url;
  }
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
  render();
});

// 把 hashMap 存储
window.onbeforeunload = () => {
  // JSON.stringify 可以把一个对象变成一个字符串
  const string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

// 键盘事件打开页面
// document.addEventListener()
$(document).on('keypress', (e) => {
  const {key} = e
  for(let i = 0; i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase() === key){
      window.open(hashMap[i].url)
    }
  }
});
