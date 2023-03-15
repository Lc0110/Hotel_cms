import hyRequest from "../request";

export function getUserMenus() {
  return hyRequest.post({
    url: `/usermenu`,
  });
}

export function fetchMemberList(queryInfo) {
  return hyRequest.post({
    url: `main/memberlist`,
    data: queryInfo,
  });
}

export function deleteMemberByid(id) {
  return hyRequest.post({
    url: `main/deletemember`,
    data: id,
  });
}

export function createMember(data) {
  return hyRequest.post({
    url: `main/createmember`,
    data,
  });
}

export function getMemberData(data) {
  return hyRequest.post({
    url: `main/getdata`,
    data,
  });
}

export function getMemberSevenData(data) {
  return hyRequest.post({
    url: `main/getSevenData`,
    data,
  });
}
