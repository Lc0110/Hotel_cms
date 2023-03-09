import hyRequest from "../../request";

export function fetchAdvertList(queryInfo) {
  return hyRequest.post({
    url: `/advert/advertlist`,
    data: queryInfo,
  });
}

export function createAdvert(data) {
  return hyRequest.post({
    url: `/advert/create`,
    data,
  });
}

export function deleteAdvertByid(id) {
  return hyRequest.post({
    url: `/advert/delete`,
    data: id,
  });
}

export function editAdvertByid(data) {
  return hyRequest.post({
    url: `/advert/edit`,
    data,
  });
}
