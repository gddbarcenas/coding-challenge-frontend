// For more information visit keen-slider.io

function Wheel(wrapper, options) {
  var defaultOptions = {
    initIdx: 1,
    loop: false,
    perspective: "center",
    width: 100,
    label: "",
  }

  options = { ...defaultOptions, ...options }

  var wheel
  var slides = []
  function createMarkup() {
    for (var i = 0; i < options.length; i++) {
      var div = document.createElement("div")
      div.setAttribute("class", "wheel__slide")
      slides.push(div)
    }

    wheel = createDiv(
      "wheel keen-slider wheel--perspective-" + options.perspective,
      [
        createDiv("wheel__shadow-top"),
        createDiv("wheel__inner", [
          createDiv("wheel__slides", slides, "width:" + options.width + "px"),
          createDiv("wheel__label", document.createTextNode(options.label)),
        ]),
        createDiv("wheel__shadow-bottom"),
      ]
    )
    wrapper.appendChild(wheel)
  }

  var slidesPerView = options.loop ? 9 : 1
  var slideDegree = 360 / 20
  var wheelSize = 20
  var radius = 200 / 2

  function createDiv(className, append, style) {
    var div = document.createElement("div")
    if (className) div.setAttribute("class", className)
    if (style) div.setAttribute("style", style)
    if (!append) return div
    if (!Array.isArray(append)) append = [append]
    append.forEach((element) => {
      div.appendChild(element)
    })
    return div
  }

  function init() {
    createMarkup()
    var sliderOptions = {
      centered: options.loop,
      vertical: true,

      initial: options.initIdx || 1,
      loop: options.loop,
      dragSpeed: (val, instance) => {
        var height = instance.details().widthOrHeight
        return (
          val *
          (height /
            ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
            slidesPerView)
        )
      },
      move: (s) => {
        updateSlides(s.details())
      },
      rubberband: !options.loop,
      mode: "free-snap",
      slides: options.length,
      slidesPerView: slidesPerView,
    }
    var slider = new KeenSlider(wheel, sliderOptions)
    return slider
  }

  function updateSlides(details) {
    var offset = options.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0
    var values = []
    for (let i = 0; i < options.length; i++) {
      var distance = (details.positions[i].distance - offset) * slidesPerView

      var rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1
      var style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      }

      var value = options.setValue
        ? options.setValue(i, details.absoluteSlide + Math.round(distance))
        : i

      // Modified 
      if(typeof(value) === 'number'){
        value++;
      }
      
      values.push({ style, value })
      slides[i].style.transform = style.transform
      slides[i].innerHTML = value;
      if(rotate > -10 && rotate < 10){
        slides[i].classList.add('centered');
      } else {
        slides[i].classList = "wheel__slide";
      }
    }
  }

  return init()
}


/*
  Modified to output the years
*/
function formatDate(idx) {
  // return moment().subtract(idx, "days").format("ddd D MMM")
  return moment().subtract(idx, "years").format('YYYY');
  
}

/* Part of the original code and wanted to keep for reference */
// new Wheel(document.getElementById("date-wheel"), {
//   loop: true,
//   length: 50,
//   setValue: formatDate,
//   width: 140,
//   perspective: "right",
// })

// new Wheel(document.getElementById("hour-wheel"), {
//   loop: true,
//   length: 13,
//   width: 23,
// })

// new Wheel(document.getElementById("minute-wheel"), {
//   loop: true,
//   length: 32,
//   width: 23,
//   perspective: "left",
// })

