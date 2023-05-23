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

export function getOrderData(data) {
  return hyRequest.post({
    url: `order/getdata`,
    data,
  });
}

export function getOrderSevenData(data) {
  return hyRequest.post({
    url: `order/getSevenData`,
    data,
  });
}

export function getTurnData(data) {
  return hyRequest.post({
    url: `order/getTurndata`,
    data,
  });
}

export function getTurnSevenData(data) {
  return hyRequest.post({
    url: `order/getTurnSevenData`,
    data,
  });
}


