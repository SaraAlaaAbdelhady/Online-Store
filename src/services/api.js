import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })




export const authService = {

    // ////////////////////////////////////////////////     send registration OTP      ////////////////////////////////////////////////
    async sendRegisterOtp(userData) {
        try {
            const res = await api.post('/auth/register/send-otp', userData)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     verify registration OTP      ////////////////////////////////////////////////
    async verifyRegisterOtp(email, otp) {
        try {
            const res = await api.post('/auth/register/verify-otp', { email, otp })
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    async login(credentials) {
        const res = await api.post('/auth/login', credentials);
        if (res.data?.token) {
            localStorage.setItem('token', res.data.token);
        }
        return res.data;
    },

    async logout() {
        const res = await api.post('/auth/logout')
        return res
    },

    // ////////////////////////////////////////////////     send forgot password OTP      ////////////////////////////////////////////////
    async sendForgotPasswordOtp(email) {
        try {
            const res = await api.post('/auth/forgot-password/send-otp', { email })
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     verify OTP & reset password      ////////////////////////////////////////////////
    async resetPassword(email, otp, newPassword) {
        try {
            const res = await api.post('/auth/forgot-password/verify-otp', { email, otp, newPassword })
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // /////////////////////////////////////////////////     get user profile           /////////////////////////////////////////////////////////////////

    async getUserProfile() {
        try {
            const res = await api.get('/auth/me')
            return res.data
        } catch (error) {

            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },



    async updateUserById(id, updatedData) {
        try {
            const res = await api.patch(`/users/${id}`, updatedData)
            return res.data
        } catch (error) {

            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }

    },
}



export const productService = {
    async getAllProducts() {
        const res = await api.get('/products');
        return res.data;
    },

    async getProductById(id) {
        try {
            const res = await api.get(`/products/${id}`)
            return res.data
        } catch (error) {

            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }

    },

    async searchProducts(filters) {
        try {
            const { search, category, minPrice, maxPrice, sort } = filters;

            const queryParts = [];
            if (search) queryParts.push(`search=${search}`);
            if (category) queryParts.push(`category=${category}`);
            if (minPrice) queryParts.push(`minPrice=${minPrice}`);
            if (maxPrice) queryParts.push(`maxPrice=${maxPrice}`);
            if (sort) queryParts.push(`sort=${sort}`);

            const queryString = queryParts.join('&');
            const res = await api.get(`/products/search?${queryString}`);
            return res.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     get product reviews       ////////////////////////////////////////////////
    async getProductReviews(id) {
        try {
            const res = await api.get(`/products/${id}/reviews`)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     add a review      ////////////////////////////////////////////////
    async addReview(id, reviewData) {
        try {
            const res = await api.post(`/products/${id}/reviews`, reviewData)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     delete a review      ////////////////////////////////////////////////
    async deleteReview(id, reviewId) {
        try {
            const res = await api.delete(`/products/${id}/reviews/${reviewId}`)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },


};

// ///////////////////////////////////////////////     order services    //////////////////////////////////////////////


export const orderService = {

    // ////////////////////////////////////////////////     place order      ////////////////////////////////////////////////
    async placeOrder(orderData) {
        try {
            const res = await api.post('/orders', orderData)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     get my orders      ////////////////////////////////////////////////
    async getMyOrders(page, limit, status) {
        try {
            const queryParts = [];
            if (page) queryParts.push(`page=${page}`);
            if (limit) queryParts.push(`limit=${limit}`);
            if (status) queryParts.push(`status=${status}`);

            const queryString = queryParts.join('&');
            const res = await api.get(`/orders/my?${queryString}`)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     get my order by id      ////////////////////////////////////////////////
    async getMyOrderById(id) {
        try {
            const res = await api.get(`/orders/my/${id}`)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     cancel my order      ////////////////////////////////////////////////
    async cancelMyOrder(id) {
        try {
            const res = await api.patch(`/orders/my/${id}/cancel`)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    }


}


// ///////////////////////////////////////////////     wishlist services    //////////////////////////////////////////////

export const wishlistService = {

    // ////////////////////////////////////////////////     add product to wishlist      ////////////////////////////////////////////////
    async addToWishlist(productId) {
        try {
            const res = await api.post(`/wishlists/add/${productId}`)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     remove product from wishlist      ////////////////////////////////////////////////
    async removeFromWishlist(productId) {
        try {
            const res = await api.delete(`/wishlists/remove/${productId}`)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     get my wishlist      ////////////////////////////////////////////////
    async getMyWishlist() {
        try {
            const res = await api.get('/wishlists/my')
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     clear wishlist      ////////////////////////////////////////////////
    async clearWishlist() {
        try {
            const res = await api.delete('/wishlists/clear')
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },
}


// ///////////////////////////////////////////////     cart services    //////////////////////////////////////////////

export const cartService = {

    // ////////////////////////////////////////////////     get my cart      ////////////////////////////////////////////////
    async getMyCart() {
        try {
            const res = await api.get('/carts')
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     add item to cart      ////////////////////////////////////////////////
    async addItemToCart(productId, quantity) {
        try {
            const res = await api.post('/carts/items', { productId, quantity })
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     update item quantity      ////////////////////////////////////////////////
    async updateItemQuantity(productId, quantity) {
        try {
            const res = await api.patch('/carts/items', { productId, quantity })
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     remove item from cart      ////////////////////////////////////////////////
    async removeItemFromCart(productId) {
        try {
            const res = await api.delete(`/carts/items/${productId}`)
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     apply coupon      ////////////////////////////////////////////////
    async applyCoupon(code) {
        try {
            const res = await api.post('/carts/coupon', { code })
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     remove coupon      ////////////////////////////////////////////////
    async removeCoupon() {
        try {
            const res = await api.delete('/carts/coupon')
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },

    // ////////////////////////////////////////////////     clear cart      ////////////////////////////////////////////////
    async clearCart() {
        try {
            const res = await api.delete('/carts/clear')
            return res.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
    },
}

