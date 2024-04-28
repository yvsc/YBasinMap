// Where to load data from. Choose either a local file in GitHub repo, such as `data/places.csv`,
// or a Google Sheets URL (File > Publish to the Web > CSV )
const dataLocation = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSI2bs4Jxow-H2twmzRAnDiySG9thbUGxeuwENwfc70eiK9VIHtAXrVCMrnw1xUnDaLxpZzp3-ukEOg/pub?output=csv';

// Map's initial center, and zoom level
const mapCenter = [40.511, -107.290]; 

const mapZoom = 9;
const maxZoomLevel = 9; 

// Marker icon height and width
const iconHeight = 55;
const iconWidth = 55;
