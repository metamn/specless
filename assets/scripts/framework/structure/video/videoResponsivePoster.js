// Read the `figure` element's responsive images and breakpoints
// Set as poster `matchMedia` coming from `Picturefill`
var videoResponsivePoster = function(elementID) {

  // Set a responsive poster using `mathcMedia`
  function setVideoResponsivePoster(element, image, breakpoint, retina) {
    var video = element.querySelector('.video');

    var mediaQuery = "only screen and " + breakpoint;

    if (retina) {
      // This might not be cross platform compatible ....
      mediaQuery += " and (-webkit-min-device-pixel-ratio: 2)";
    }

    if (matchMedia(mediaQuery).matches) {
      video.poster = image;
    }
  }

  responsiveImageURL(elementID, setVideoResponsivePoster);
};
