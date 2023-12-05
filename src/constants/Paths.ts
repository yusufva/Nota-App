/**
 * Express router paths go here.
 */


export default {
	Base: '/api',
	Users: {
		Base: '/users',
		Get: '/',
		Add: '/',
		Update: '/:id',
		Delete: '/:id',
	},
	ProductMaster:{
		Base: '/product-master',
		Get: '/',
		Add: '/',
		GetById: '/:id',
		Update: '/:id',
		Delete: '/:id',
	},
	Stock:{
		Base: '/stock',
		Get: '/',
		GetById: '/:id',
		Update: '/:id',
	},
	TxBuy:{
		Base: '/tx-buy',
		Get: '/',
		Create: '/',
		GetById: '/:id',
	},
} as const;
