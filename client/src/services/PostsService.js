import Api from '@/services/Api'

export default {
    fetchPosts () {
        return Api().get('posts')
    },

    addPosts (params) {
        return Api().post('posts', params)
    }
}