/**
 * Express router paths go here.
 */

export default {
    Base: "/api",
    Users: {
        Base: "/users",
        Get: "/",
        Add: "/",
        Update: "/:id",
        Delete: "/:id",
    },
    ProductMaster: {
        Base: "/product-master",
        Get: "/",
        Add: "/",
        GetById: "/:id",
        Update: "/:id",
        Delete: "/:id",
    },
    Stock: {
        Base: "/stock",
        Get: "/",
        GetById: "/:id",
        Update: "/:id",
    },
    TxBuy: {
        Base: "/tx-buy",
        Get: "/",
        Create: "/",
        GetById: "/:id",
    },
    TxSell: {
        Base: "/tx-sell",
        Get: "/",
        Create: "/",
        GetById: "/:id",
    },
    report: {
        Base: "/report",
        TxBuy: {
            Base: "/tx-buy",
            GetByDate: "/date",
            GetByMonth: "/month",
        },
        TxSell: {
            Base: "/tx-sell",
            GetByDate: "/date",
            GetByMonth: "/month",
        },
    },
} as const;
