export const getIsAdminOnline = state => {
	return state.isAdminOnline;
}

export const getProducts = state => {
	return state.shopingCard.products;
}

export const getTotalPrice = state => {
	return state.shopingCard.totalPrice
}