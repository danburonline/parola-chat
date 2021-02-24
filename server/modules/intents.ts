export function sliderIntent(): any {
  const message = {
    messageText: "Da hesch eh Produkte-Slider:",
    author: "PAROLA",
    messageType: "SLIDER",
    mediaSrc: [
      {
        title: "This is a title",
        descr: "This is the description",
        url: "https://google.com",
        img: "https://picsum.photos/500/400"
      },
      {
        title: "This is another title",
        descr: "This is another description",
        url: "https://duck.com",
        img: "https://picsum.photos/500/400"
      },
      {
        title: "This is the last title",
        descr: "This is the last description",
        url: "https://facebook.com",
        img: "https://picsum.photos/500/400"
      },
      {
        title: "This is still another title",
        descr: "This is def the last description",
        url: "https://reddit.com",
        img: "https://picsum.photos/500/400"
      }
    ]
  }

  return message
}

export function imageIntent(): any {
  const message = {
    messageText: "Da es Bispill-Bild:",
    author: "PAROLA",
    messageType: "IMAGE",
    mediaSrc: "https://picsum.photos/500/450"
  }

  return message
}

export function videoIntent(): any {
  const message = {
    messageText: "Da es Bispill-Video:",
    author: "PAROLA",
    messageType: "VIDEO",
    mediaSrc: "https://www.youtube.com/embed/aqz-KE-bpKQ"
  }

  return message
}