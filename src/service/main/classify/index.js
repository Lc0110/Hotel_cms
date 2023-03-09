import hyRequest from "../../request";

export function fetchClassifyList(queryInfo) {
  return hyRequest.post({
    url: `/classify/classifylist`,
    data: queryInfo,
  });
}

export function createClassify(data) {
  return hyRequest.post({
    url: `/classify/create`,
    data,
  });
}

export function deleteClassifyByid(id) {
  return hyRequest.post({
    url: `/classify/delete`,
    data: id,
  });
}

export function editClassifyByid(data) {
  return hyRequest.post({
    url: `/classify/edit`,
    data,
  });
}
