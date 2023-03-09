import hyRequest from "../../request";

export function fetchAdminsList(queryInfo) {
  return hyRequest.post({
    url: `/admins/adminlist`,
    data: queryInfo,
  });
}

export function createAdmins(data) {
  return hyRequest.post({
    url: `/admins/createAdmin`,
    data,
  });
}

export function deleteAdminsByid(id) {
  return hyRequest.post({
    url: `/admins/delete`,
    data: id,
  });
}

export function editAdminsByid(data) {
  return hyRequest.post({
    url: `/admins/edit`,
    data,
  });
}
