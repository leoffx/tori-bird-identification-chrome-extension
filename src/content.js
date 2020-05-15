var imageMeta = {};

const setImageTitles = () => {
  const images = document.getElementsByTagName("img");
  const keys = Object.keys(imageMeta);
  for (u = 0; u < keys.length; u++) {
    var url = keys[u];
    var meta = imageMeta[url];
    for (i = 0; i < images.length; i++) {
      var img = images[i];
      if (img.src === meta.url) {
        var divtest = document.createElement("div");
        divtest.innerHTML = JSON.stringify(meta.predictions);
        divtest.style.position = "relative";
        divtest.style.top = "1ex";
        divtest.style.left = "1ex";
        divtest.style.borderRadius = "1em";
        divtest.style.border = "solid thin gray";
        divtest.style.backgroundColor = "white";
        img.parentElement.appendChild(divtest);
        //img.title = img.src + `:\n\n${img.title}\n\n` + JSON.stringify(meta.predictions);
        delete keys[u];
        delete imageMeta[url];
      }
    }
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.payload && message.action === "IMAGE_PROCESSED") {
    const { payload } = message;
    if (payload && payload.url) {
      imageMeta[payload.url] = payload;
      setImageTitles();
    }
  }
});

window.addEventListener("load", setImageTitles, false);
