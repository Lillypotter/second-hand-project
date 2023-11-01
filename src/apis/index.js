import request from '../utils/request';
const api={
    //获得在线商品
    findIdleTiem(query) {
        return request({
            url: '/idle/find',
            method: 'get',
            params: query
        });
    },
    //获取用户信息
    getUserInfo(query) {
        return request({
            url: '/user/info',
            method: 'get',
            params: query
        });
    },
    // 获取订单
    getMyOrder(query) {
        return request({
            url: '/order/my',
            method: 'get',
            params: query
        });
    },
    // 我卖出的
    getMySoldIdle(query) {
        return request({
            url: '/order/my-sold',
            method: 'get',
            params: query
        });
    },
    // 我的收藏
    getMyFavorite(query) {
        return request({
            url: '/favorite/my',
            method: 'get',
            params: query
        });
    },
    // 我的发布+我的下架
    getAllIdleItem(query) {
        return request({
            url: '/idle/all',
            method: 'get',
            params: query
        });
    },
    // 获得地址
    getAddress(query) {
        return request({
            url: '/address/info',
            method: 'get',
            params: query
        });
    },
    //更新地址
    updateAddress(data) {
        return request({
            url: '/address/update',
            method: 'post',
            data: data
        });
    },
    //新增地址
    addAddress(data) {
        return request({
            url: '/address/add',
            method: 'post',
            data: data
        });
    },
    // 删除地址
    deleteAddress(data) {
        return request({
            url: '/address/delete',
            method: 'post',
            data: data
        });
    },
    // 确认发布
    addIdleItem(data) {
        return request({
            url: '/idle/add',
            method: 'post',
            data: data
        });
    },
    //登录
    userLogin(query) {
        return request({
            url: '/user/login',
            method: 'get',
            params: query
        });
    },
    //修改密码
    updatePassword(query) {
        return request({
            url: '/user/password',
            method: 'get',
            params: query
        });
    },
    //上传图片 
    uploadPicture(data, options) {
        return request({
            url: '/file',
            method: 'post',
            data:formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    // 更新用户名
    updateUserPublicInfo(data) {
        return request({
            url: '/user/info',
            method: 'post',
            data: data
        });
    },
    // 登出
    logout(query) {
        return request({
            url: '/user/logout',
            method: 'get',
            params: query
        });
    },
    //注册
    signIn(data) {
        return request({
            url: '/user/sign-in',
            method: 'post',
            data: data
        });
    },
    
}
export default api;