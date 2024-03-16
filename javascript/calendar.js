/*===================================================
 calendar.js
 カレンダー機能の記述 *長文のため別途記述
================================================== */
// 今日の日付を取得
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; // January is 0!
var yyyy = today.getFullYear();
var currentMonth = today.getMonth() + 1;
var currentYear = today.getFullYear();
var prevMonthLink = document.getElementById('prevMonth');
var nextMonthLink = document.getElementById('nextMonth');
var currentMonthSpan = document.getElementById('currentMonth');

// 前月へのリンクを設定
prevMonthLink.addEventListener('click', function(event) {
  event.preventDefault();
  if (currentYear === yyyy && currentMonth === 3) {
    return; // 3月以前のカレンダーに切り替えることはできない
  }
  currentMonth--;
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 12;
  }
  updateCalendar();
});

// 翌月へのリンクを設定
nextMonthLink.addEventListener('click', function(event) {
  event.preventDefault();
  currentMonth++;
  if (currentMonth === 13) {
    currentYear++;
    currentMonth = 1;
  }
  updateCalendar();
});

// カレンダーの日付を生成
function generateCalendar() {
  var tbody = document.querySelector('.calendar__body'); // tbodyを指定
  var startDate = new Date(currentYear, currentMonth - 1, 1); // 現在の月の最初の日
  var endDate = new Date(currentYear, currentMonth, 0); // 現在の月の最後の日
  var currentDate = new Date(startDate);

  var html = '';
  html += '<tr>'; // 最初の行開始
  for (var i = 0; i < currentDate.getDay(); i++) {
    html += '<td class="calendar__day grayed-out">-</td>'; // 1日の曜日までの空白セル
  }

  while (currentDate <= endDate) {
    if (currentDate.getDay() === 0) {
      html += '</tr><tr>'; // 日曜日の場合、新しい行を開始
    }
    var dayClass = currentDate.getMonth() + 1 === currentMonth ? '' : 'grayed-out';
    var activeClass = '';
    var disabledClass = '';

    // 今日よりも前の日付の場合はリンクを無効化する
    if (currentDate < today) {
      disabledClass = ' disabled-link';
    }

    if (currentDate.getDate() === dd && currentMonth === mm && currentYear === yyyy) {
      activeClass = ' active'; // 今日の日付の場合、activeクラスを追加
    }

    html += '<td class="calendar__day' + (currentDate.getDay() === 0 ? ' calendar__sunday' : '') + (currentDate.getDay() === 6 ? ' calendar__saturday' : '') + dayClass + activeClass + disabledClass + '">' + currentDate.getDate() + '<br>';

    // 料金と空室状況をランダムに表示
    var price = '¥25,000/人';
    var availability;
    var remainingRooms = Math.floor(Math.random() * 5); // 0から4のランダムな数
    if (remainingRooms === 0) {
      availability = '✖︎';
      html += '<span class="calendar__unavailable">' + price + '<br>' + availability + '</span>';
    } else if (remainingRooms <= 3) {
      availability = '残り ' + remainingRooms + ' 室';
      html += '<a href="reservation_info.html" class="calendar__reservation-link">' + price + '<br>' + availability + '</a>';
    } else {
      availability = '⚪︎';
      html += '<a href="reservation_info.html" class="calendar__reservation-link">' + price + '<br>' + availability + '</a>';
    }

    html += '</td>';
    currentDate.setDate(currentDate.getDate() + 1);
  }

  while (currentDate.getDay() > 0 && currentDate.getDay() < 7) {
    html += '<td class="calendar__day grayed-out">-</td>'; // 最後の日から土曜日までの空白セル
    currentDate.setDate(currentDate.getDate() + 1);
  }
  html += '</tr>'; // 最後の行を閉じる

  tbody.innerHTML = html;
  currentMonthSpan.textContent = currentYear + '年' + currentMonth + '月';
}

// カレンダーを更新
function updateCalendar() {
  generateCalendar();
}

// カレンダーを生成
generateCalendar();

