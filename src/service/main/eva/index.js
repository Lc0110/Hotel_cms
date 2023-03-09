import hyRequest from "../../request";

export function fetchEvaList(queryInfo) {
  return hyRequest.post({
    url: `/eva/evalist`,
    data: queryInfo,
  });
}

export function createEva(data) {
  return hyRequest.post({
    url: `/eva/create`,
    data,
  });
}

export function deleteEvaByid(id) {
  return hyRequest.post({
    url: `/eva/delete`,
    data: id,
  });
}

export function editEvaByid(data) {
  return hyRequest.post({
    url: `/eva/edit`,
    data,
  });
}
