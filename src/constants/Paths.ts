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
		Update: '/:id',
		Delete: '/:id',
	},
} as const;
