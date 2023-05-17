import { defineStore } from "pinia";
import {
  fetchOrderList,
  createOrder,
  deleteOrderByid,
  editOrderByid,
  changeOrderStatus,
} from "@/service/main/order";

const OrderStore = defineStore("order", {
  state: () => ({
    orderList: [],
    orderTotalCount: 0,
  }),
  actions: {
    async getOrderList(queryInfo) {
      const orderList = await fetchOrderList(queryInfo);
      this.orderList = orderList.data;
      this.orderTotalCount = orderList.count[0].count;
    },
    async createOrderAction(data) {
      const createRes = await createOrder(data);
      console.log(createRes);
      this.getOrderList({ size: 10, offset: 0 });
    },
    async deleteOrderAction(id) {
      const delResult = await deleteOrderByid(id);
      console.log(delResult);
      this.getOrderList({ size: 10, offset: 0 });
    },
    async editOrderAction(data) {
      const editResult = await editOrderByid(data);
      console.log(editResult);
      this.getOrderList({ size: 10, offset: 0 });
    },
    async changeStatus(data) {
      const changeResult = await changeOrderStatus(data);
      console.log(changeResult);
      this.getOrderList({ size: 10, offset: 0 });
    },
  },
});

export default OrderStore;
