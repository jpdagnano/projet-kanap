const pageIdWindow = window.location.search;

const pageIdLong = new URLSearchParams(pageIdWindow);
const pageId = pageIdLong.get("_id");
