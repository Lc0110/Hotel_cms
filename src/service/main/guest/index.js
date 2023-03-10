import hyRequest from "../../request";
export function fetchGuestList(queryInfo) {
  return hyRequest.post({
    url: `/guest/guestlist`,
    data: queryInfo,
  });
}

export function createGuest(data) {
  return hyRequest.post({
    url: `/guest/create`,
    data,
  });
}

export function deleteGuestByid(id) {
  return hyRequest.post({
    url: `/guest/delete`,
    data: id,
  });
}

export function editGuestByid(data) {
  return hyRequest.post({
    url: `/guest/edit`,
    data,
  });
}

export function searchGuest(data) {
  return hyRequest.post({
    url: `/guest/search`,
    data,
  });
}
