import hyRequest from "../request";

export function accountLoginRequest(account) {
  return hyRequest.post({
    url: "/login",
    data: account,
  });
}
