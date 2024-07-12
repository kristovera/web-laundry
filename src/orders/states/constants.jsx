export const ORDER_DATA_INIT = {
    nomor: "",
    tanggal: new Date(),
    total: null,
    items: [],
    owner: "",
    isDelete: false,
  };
  
  export const ORDER_FIELD_GUIDE = ["nomor", "tanggal", "total"];
  
  export const ORDER_FIELD_VALIDATION = ["nomor", "tanggal", "total", "items"];
  
  export const READ_ORDERS = "read-orders";
  export const CREATE_ORDERS = "create-orders";
  export const UPDATE_ORDERS = "update-orders";
  export const DELETE_ORDERS = "delete-orders";
  