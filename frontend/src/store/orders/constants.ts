// Prefixes
export const CREATE_ORDER_PREFIX = "CREATE_ORDER_PREFIX";
export const DELETE_ORDER_PREFIX = "DELETE_ORDER_PREFIX";
export const SYNC_ORDER_PREFIX = "SYNC_ORDER_PREFIX";
export const FETCH_ORDERS_PREFIX = "FETCH_ORDERS_PREFIX";
export const MARK_ORDER_DELIVERED_PREFIX = "MARK_ORDER_DELIVERED_PREFIX";
export const MARK_ORDER_RECIEVED_PREFIX = "MARK_ORDER_RECIEVED_PREFIX";

// Urls
export const CREATE_ORDER_URL = "/api/orders/place-order";
export const DELETE_ORDER_URL = "/api/orders/delete-order";
export const SYNC_ORDER_URL = "/api/orders/sync-order";
export const FETCH_ORDERS_URL = "/api/orders/";
export const MARK_ORDER_DELIVERED_URL = "/api/orders/mark-as-delivered";
export const MARK_ORDER_RECIEVED_URL = "/api/orders/mark-as-recieved";

// Shared Operations
export const SYNC_ORDER = "sync";
export const CREATE_ORDER = "create";
export const DELETE_ORDER = "delete";
export const CHANGING_ORDER_STATUS = "changingStatus";
