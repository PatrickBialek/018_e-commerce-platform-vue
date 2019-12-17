export const updateIsAdminOnline = ({
	commit
}, payload) => {
	commit("updateIsAdminOnline", payload);
};

export const addNewProduct = ({
	commit
}, payload) => {
	commit("addNewProduct", payload);
}

export const removeProduct = ({
	commit
}, id) => {
	commit("removeProduct", id);
}

export const updateProductAmount = ({
	commit
}, {
	productId,
	by
}) => {
	commit("updateProductAmount", {
		productId,
		by
	});
}

export const updateTotalPrice = ({
	commit
}, price) => {
	commit("updateTotalPrice", price)
}