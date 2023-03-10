import hyRequest from "../../request";
export function fetchRoomList(queryInfo) {
  return hyRequest.post({
    url: `/room/roomlist`,
    data: queryInfo,
  });
}

export function createRoom(data) {
  return hyRequest.post({
    url: `/room/create`,
    data,
  });
}

export function deleteRoomByid(id) {
  return hyRequest.post({
    url: `/room/delete`,
    data: id,
  });
}

export function editRoomByid(data) {
  return hyRequest.post({
    url: `/room/edit`,
    data,
  });
}

export function changeRoomStatus(data) {
  return hyRequest.post({
    url: `/room/change`,
    data,
  });
}

export function searchRoom(data) {
  return hyRequest.post({
    url: `/room/search`,
    data,
  });
}
