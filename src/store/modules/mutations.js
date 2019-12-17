export const updateIsAdminOnline = (state, payload) => {
	state.isAdminOnline = payload;
}

export const addNewProduct = (state, payload) => {
	state.shopingCard.products.push(payload);
	window.localStorage.setItem("products", JSON.stringify(state.shopingCard.products));
}

export const removeProduct = (state, id) => {
	const productToReomve = state.shopingCard.products.find(product => product.id == id);
	const index = state.shopingCard.products.indexOf(productToReomve);

	state.shopingCard.products.splice(index, 1);
	window.localStorage.setItem("products", JSON.stringify(state.shopingCard.products));
}

export const updateProductAmount = (state, {
	productId,
	by
}) => {
	const productToUpdate = state.shopingCard.products.find(product => product.id == productId);
	productToUpdate.amount = productToUpdate.amount + by;
}

export const updateTotalPrice = (state, price) => {
	state.shopingCard.totalPrice = state.shopingCard.totalPrice + price
	window.localStorage.setItem("totalPrice", state.shopingCard.totalPrice);
}