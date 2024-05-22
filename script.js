var data = {};
var groups = {};
var map;

/*
 * Given a string `str`, replaces whitespaces with dashes,
 * and removes nonalphanumeric characters. Used in URL hash.
 */
var slugify = function(str) {
  return str.replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

/*
 * Resets map view to originally defined `mapCenter` and `mapZoom` in settings.js
 */
var resetView = function() {
  map.flyTo(mapCenter, mapZoom);
  resetSidebar();
}

/*
 * Resets sidebar, clearing out place info and leaving title+footer only
 */
var resetSidebar = function() {
  // Make the map title original color
  $('header').removeClass('black-50');

  // Clear placeInfo containers
  $('#placeInfo').addClass('dn');
  $('#placeInfo h2, #placeInfo h3').html('');
  $('#placeInfo div').html('');
  $('#googleMaps').addClass('dn').removeClass('dt');

  // Reset hash
  location.hash = '';
}

/*
 * Given a `marker` with data bound to it, update text and images in sidebar
 */
var updateSidebar = function(marker) {
  // Get data bound to the marker
  var d = marker.options.placeInfo;

  if (L.DomUtil.hasClass(marker._icon, 'markerActive')) {
    // Deselect current icon
    L.DomUtil.removeClass(marker._icon, 'markerActive');
    resetSidebar();
  } else {
    location.hash = d.slug;

    // Dim map's title
    $('header').addClass('black-50');
    $('#placeInfo').removeClass('dn');

    // Clear out active markers from all markers
    $('.markerActive').removeClass('markerActive');

    // Make clicked marker the new active marker
    L.DomUtil.addClass(marker._icon, 'markerActive');

    // Populate place information into the sidebar
    $('#placeInfo').animate({ opacity: 0.5 }, 300).promise().done(function() {
      $('#placeInfo h2').html(d.Name);
      $('#placeInfo h3').html(d.Subtitle);
      $('#description').html(d.Description);

      if (d.GoogleMapsLink) {
        $('#googleMaps').removeClass('dn').addClass('dt').attr('href', d.GoogleMapsLink);
      } else {
        $('#googleMaps').addClass('dn').removeClass('dt');
      }

      $('#gallery').html('');
      $('#galleryIcon').hide();

      // Load up to 5 images
      for (var i = 1; i <= 5; i++) {
        var idx = 'Image' + i;

        if (d[idx]) {
          var source = "<em class='normal'>" + d[idx + 'Source'] + '</em>';

          if (source && d[idx + 'SourceLink']) {
            source = "<a href='" + d[idx + 'SourceLink'] + "' target='_blank'>" + source + "</a>";
          }

          var a = $('<a/>', {
            href: d[idx],
            'data-lightbox': 'gallery',
            'data-title': (d[idx + 'Caption'] + ' ' + source) || '',
            'data-alt': d.Name,
            'class': i === 1 ? '' : 'dn'
          });

          var img = $('<img/>', { src: d[idx], alt: d.Name, class: 'dim br1' });
          $('#g
