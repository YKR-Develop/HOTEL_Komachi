/*===================================================
 form.js
 入力フォーム関連
================================================== */
function validateForm() {
  var date = document.getElementById("check-in-date").value;
  var guestCount = document.getElementById("guest-count").value;
  var stayDuration = document.getElementById("stay-duration").value;
  var roomCount = document.getElementById("room-count").value;
  var shuttle = document.querySelector('input[name="shuttle"]:checked');
  var breakfast = document.querySelector('input[name="breakfast"]:checked');
  var dinner = document.querySelector('input[name="dinner"]:checked');
  var errorMessage = document.getElementById("error-message");

  if (!date || !guestCount || !stayDuration || !roomCount || !shuttle || !breakfast || !dinner) {
      errorMessage.innerHTML = "必須項目をすべて入力してください。";
      return false;
  }
  errorMessage.innerHTML = ""; // エラーメッセージをリセット
  return true;
}