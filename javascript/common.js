/*===================================================
 common.js
 javascript / jQuery記述
================================================== */
/* --------------------------------------------------
header ヘッダー固定表示
-------------------------------------------------- */
$(function () {
  // スクロールを開始したら
  $(window).on("scroll", function () {
    // ファーストビューの高さを取得
    mvHeight = $(".js-mv").height();
    if ($(window).scrollTop() > mvHeight) {
      // スクロールの位置がファーストビューより下の場合にclassを付与
      $(".js-fixed-header").addClass("transform");
    } else {
      // スクロールの位置がファーストビューより上の場合にclassを外す
      $(".js-fixed-header").removeClass("transform");
    }
  });
});

/* --------------------------------------------------
header ハンバーガーメニュー
-------------------------------------------------- */
function toggleNav() {
  var body = document.body;
  var hamburger = document.getElementById('js-hamburger');
  var blackBg = document.getElementById('js-header-bg');

  hamburger.addEventListener('click', function () {
    body.classList.toggle('nav-open');
  });
  blackBg.addEventListener('click', function () {
    body.classList.remove('nav-open');
  });
}
toggleNav();


/* --------------------------------------------------
 index.html ズームスワイプの指定
-------------------------------------------------- */
let swipeOption = {
  loop: true, // スライダーをループさせる設定
  effect: 'fade', // フェードさせる為の設定
  fadeEffect: {
    crossFade: true//縦横比が統一されない画像の場合、重なる場合がある為、それを防ぐ設定
  },
  autoplay: {
    delay: 2000, // 秒後に次の画像にいくようにする設定
    disableOnInteraction: false,// ユーザーが操作後、自動再生を再開する設定
  },
  speed: 2000, // 2秒かけ次の画像へ移動させる設定
  allowTouchMove: false, // マウスでのスワイプを禁止する設定

}
new Swiper('.swiper-mv', swipeOption);

/* --------------------------------------------------
カレンダーの初期値を今日の日付に設定
-------------------------------------------------- */
window.onload = function () {
  var today = new Date();
  today.setDate(today.getDate());
  let yyyy = today.getFullYear();
  let mm = ("0" + (today.getMonth() + 1)).slice(-2);
  let dd = ("0" + today.getDate()).slice(-2);
  document.getElementById("today").value = yyyy + '-' + mm + '-' + dd;
}

/* --------------------------------------------------
index.html コンテンツ内スライドショーの指定
-------------------------------------------------- */
let swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination", //必須の設定：ページネーションのclass指定
    type: "bullets",
    clickable: "clickable"
  },
  speed: 800,
  loop: true,
  //小数点で表示領域を設定する
  slidesPerView: 1.5,
  spaceBetween: 40,
  // 中央に配置する
  centeredSlides: true,
});

/* --------------------------------------------------
サムネイルスライドショー
-------------------------------------------------- */
window.onload = function () {
  var sliderWrap = document.querySelectorAll(".slider-wrap");
  var sliderThumb = document.querySelectorAll(".slider-thumb");
  var sliderMain = document.querySelectorAll(".slider-main");
  var sliderNext = document.querySelectorAll(".swiper-button-next");
  var sliderPrev = document.querySelectorAll(".swiper-button-prev");
  for (let i = 0; i < sliderWrap.length; i++) {
    var num = ("00" + (i + 1)).slice(-2);
    sliderWrap[i].className += num;
    sliderThumb[i].className += num;
    sliderMain[i].className += num;
    sliderNext[i].className += num;
    sliderPrev[i].className += num;
    //サムネイル用のスライダー指定
    var swiperThumb = new Swiper(".slider-thumb" + num, {
      slidesPerView: 3,
      spaceBetween: 7
    });
    //メインのスライダー指定
    var swiperMain = new Swiper(".slider-main" + num, {
      loop: true,
      speed: 1000, // 少しゆっくり(デフォルトは300)
      autoplay: { // 自動再生
        delay: 3000, // 1.5秒後に次のスライド
      },
      centeredSlides: true,
      effect: 'fade',
      slidesPerView: 1,
      thumbs: {
        swiper: swiperThumb
      },
      // 前後の矢印
      navigation: {
        nextEl: ".swiper-button-next" + num,
        prevEl: ".swiper-button-prev" + num
      }
    });
  }
};

/* --------------------------------------------------
サイドメニューの開閉システム
-------------------------------------------------- */
$(function () {
  $('#js-side-slide_top').hover(
    function () {
      $(this).animate({ 'marginRight': '180px' }, 500);
    },
    function () {
      $(this).animate({ 'marginRight': '0' }, 500);
    }
  );
});

$(function () {
  $('#js-side-slide_bottom').hover(
    function () {
      $(this).animate({ 'marginRight': '180px' }, 500);
    },
    function () {
      $(this).animate({ 'marginRight': '0' }, 500);
    }
  );
});

/* --------------------------------------------------
information / index.html ページネーション
-------------------------------------------------- */
$(function () {
  $('.article-list').paginathing({//親要素のclassを記述
    firstLast: false,
    perPage: 8,//1ページあたりの表示件数
    prevText: '前へ',//1つ前のページへ移動するボタンのテキスト
    nextText: '次へ',//1つ次のページへ移動するボタンのテキスト
    activeClass: 'navi-active',//現在のページ番号に任意のclassを付与できます
  })
});


/* --------------------------------------------------
タブメニューcurrent
-------------------------------------------------- */
$(function() {
  // パラメータ取得
  function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
 
  // ページ読み込み時のタブ切り替え
  let tabPram = ['tab-1', 'tab-2', 'tab-3', 'tab-4', 'tab-5'];
  let pram = getParam('active-tab');
  if (pram && $.inArray(pram, tabPram) !== -1) {
    $('.js-tab-cts,.js-tab-switch').removeClass('is-active');
    $('[data-tab="' + pram + '"]').addClass('is-active');
  }
 
  // ロード後のタブ切り替え
  $('.js-tab-switch').on('click', function() {
    let dataPram = $(this).data('tab');
    $('.js-tab-cts,.js-tab-switch').removeClass('is-active');
    $('[data-tab="' + dataPram + '"]').addClass('is-active');
  });
});

/* --------------------------------------------------
宿泊予約絞り込み / プラン絞り込み
-------------------------------------------------- */
document.querySelectorAll('input[type="radio"][name="sort"]').forEach(function (radio) {
  radio.addEventListener('change', function () {
    var order = this.value;
    sortByPrice(order);
  });
});

function sortByPrice(order) {
  var elements = document.querySelectorAll('.reservation-plan__item');
  var sortedElements = Array.from(elements);
  if (order !== 'all') {
    sortedElements = sortedElements.sort(function (a, b) {
      var priceA = parseInt(a.getAttribute('data-price'));
      var priceB = parseInt(b.getAttribute('data-price'));
      if (order === 'price-cheap') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  }
  var container = document.querySelector('.reservation-plan');
  container.innerHTML = '';
  sortedElements.forEach(function (element) {
    container.appendChild(element);
  });
}


/* --------------------------------------------------
もっと見るボタン
-------------------------------------------------- */
let elements = document.querySelectorAll('.js-more');

Array.from(elements).forEach(function (el) {

  //ボタンを取得
  let btn = el.querySelector('.is-more-btn');
  //コンテンツを取得
  let content = el.querySelector('.js-more-contents');

  //ボタンクリックでイベント発火
  btn.addEventListener('click', function () {

    if (!content.classList.contains('open')) {
      //コンテンツの実際の高さを代入
      //キーワード値（none、max-content等）では動作しないので注意
      content.style.maxHeight = content.scrollHeight + 'px';
      //openクラスを追加
      content.classList.add('open');
      //もっと見るボタンのテキストを設定
      btn.textContent = 'プラン詳細を閉じる';
    } else {
      //コンテンツの高さを固定値を代入
      content.style.maxHeight = '72px';
      //openクラスを削除
      content.classList.remove('open');
      //もっと見るボタンのテキストを設定
      btn.textContent = 'プラン詳細';
    }
  });
});

/* --------------------------------------------------
モーダル表示
-------------------------------------------------- */
$(function () {
  $('.js-modal-button').each(function () {
    $(this).on('click', function () {
      var target = $(this).data('target');
      var modal = document.getElementById(target);
      $(modal).fadeIn();
      return false;
    });
  });
  $('.js-modal-close').on('click', function () {
    $('.js-modal').fadeOut();
    return false;
  });
});

/* --------------------------------------------------
mypage.html ボタンクリックで予約詳細を表示
-------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-details").forEach(function (el) {
    const summary = el.querySelector(".js-summary");
    const answer = el.querySelector(".js-contents");
    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();
      // detailsのopen属性を判定
      if (el.getAttribute("open") !== null) {
        // アコーディオンを閉じるときの処理
        const closingAnim = answer.animate(closingAnimation(answer), animTiming);

        closingAnim.onfinish = () => {
          // アニメーションの完了後にopen属性を取り除く
          el.removeAttribute("open");
        };
      } else {
        // open属性を付与
        el.setAttribute("open", "true");
        // アコーディオンを開くときの処理
        const openingAnim = answer.animate(openingAnimation(answer), animTiming);
      }
    });
  });
});

// アニメーションの時間とイージング
const animTiming = {
  duration: 300,
  easing: "ease-in-out",
};

// アコーディオンを閉じるときのキーフレーム
const closingAnimation = (answer) => [
  {
    height: answer.offsetHeight + "px",
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

// アコーディオンを開くときのキーフレーム
const openingAnimation = (answer) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: answer.offsetHeight + "px",
    opacity: 1,
  },
];

/* --------------------------------------------------
プライバシーポリシー同意でボタンがアクティブ
-------------------------------------------------- */
// 「同意する」のチェックボックスを取得
const agreeCheckbox = document.getElementById("agree");
// 送信ボタンを取得
const submitBtn = document.getElementById("submit-btn");

// チェックボックスをクリックした時
agreeCheckbox.addEventListener("click", () => {
  // チェックされている場合
  if (agreeCheckbox.checked === true) {
    submitBtn.disabled = false; // disabledを外す
  }
  // チェックされていない場合
  else {
    submitBtn.disabled = true; // disabledを付与
  }
});

