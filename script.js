var watch = (function() {
  var timer = document.getElementById("timer");
  var stop = document.getElementById("stop");
  var start = document.getElementById("start");
  var reset = document.getElementById("reset");
  var settingsBtn = document.getElementById("settings-btn");
  var settingsModal = document.getElementById("settings-modal");
  var saveSettingsBtn = document.getElementById("save-settings");
  var cancelSettingsBtn = document.getElementById("cancel-settings");

  var time = "00:00";
  var seconds = 0;
  var minutes = 0;
  var t;

  function buildTimer() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        seconds = 0;
      }
    }
    var formattedMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;
    var formattedSeconds = seconds < 10 ? "0" + seconds.toString() : seconds;
    timer.textContent = formattedMinutes + ":" + formattedSeconds;
  }

  function stopTimer() {
    clearTimeout(t);
  }

  function startTimer() {
    stopTimer(); // Clear any previous interval before starting a new one
    t = setInterval(buildTimer, 1000);
  }

  function resetTimer() {
    stopTimer();
    timer.textContent = time;
    seconds = 0;
    minutes = 0;
  }

  function showSettingsButton() {
    settingsBtn.style.display = "block";
  }

  function hideSettingsButton() {
    settingsBtn.style.display = "none";
  }

  function showSettingsModal() {
    settingsModal.style.display = "block";
  }

  function hideSettingsModal() {
    settingsModal.style.display = "none";
  }

  function applyButtonStyles(fontColor, bgColor) {
    var buttons = document.querySelectorAll("button");
    buttons.forEach(function(button) {
      button.style.color = fontColor;
      button.style.backgroundColor = bgColor;
      button.style.borderColor = fontColor;
      button.addEventListener("mouseenter", function() {
        button.style.color = bgColor;
        button.style.backgroundColor = fontColor;
        button.style.borderColor = fontColor;
      });
      button.addEventListener("mouseleave", function() {
        button.style.color = fontColor;
        button.style.backgroundColor = bgColor;
        button.style.borderColor = fontColor;
      });
    });
  }

  function savePreferences(bgColor, fontColor) {
    localStorage.setItem('background-color', bgColor);
    localStorage.setItem('font-color', fontColor);
  }

  function loadPreferences() {
    var savedBgColor = localStorage.getItem('background-color');
    var savedFontColor = localStorage.getItem('font-color');

    if (savedBgColor && savedFontColor) {
      document.body.style.backgroundColor = savedBgColor;
      document.body.style.color = savedFontColor;
      applyButtonStyles(savedFontColor, savedBgColor);
      settingsBtn.style.color = savedFontColor;
      settingsBtn.style.backgroundColor = savedBgColor;
    }
  }

  settingsBtn.addEventListener("click", showSettingsModal);
  saveSettingsBtn.addEventListener("click", function() {
    var selectedBgColor = document.getElementById("background-color").value;
    var selectedFontColor = document.getElementById("font-color").value;

    document.body.style.backgroundColor = selectedBgColor;
    document.body.style.color = selectedFontColor;
    applyButtonStyles(selectedFontColor, selectedBgColor);
    settingsBtn.style.color = selectedFontColor;
    settingsBtn.style.backgroundColor = selectedBgColor;

    savePreferences(selectedBgColor, selectedFontColor);
    hideSettingsModal();
  });

  cancelSettingsBtn.addEventListener("click", hideSettingsModal);

  // Show and hide settings button on mouse activity
  var timeout;
  document.addEventListener("mousemove", function() {
    clearTimeout(timeout);
    showSettingsButton();
    timeout = setTimeout(hideSettingsButton, 2000);
  });

  start.addEventListener("click", startTimer);
  reset.addEventListener("click", resetTimer);
  stop.addEventListener("click", stopTimer);

  // Load preferences when the page loads
  loadPreferences();

  return {
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer
  };
})();