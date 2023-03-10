import hyRequest from "../../request";

export function fetchOrderList(queryInfo) {
  return hyRequest.post({
    url: `/order/orderlist`,
    data: queryInfo,
  });
}

export function createOrder(data) {
  return hyRequest.post({
    url: `/order/create`,
    data,
  });
}

export function deleteOrderByid(id) {
  return hyRequest.post({
    url: `/order/delete`,
    data: id,
  });
}

export function editOrderByid(data) {
  return hyRequest.post({
    url: `/order/edit`,
    data,
  });
}

export function changeOrderStatus(data) {
  return hyRequest.post({
    url: `/order/change`,
    data,
  });
}

