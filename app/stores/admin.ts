export const useAdminStore = defineStore('admin', {
  state: () => ({
    isLoggedIn: false,//登入狀態
    skipAgePage: false//年齡確認
  }),
  actions: {
    setLogin(status: boolean) {
      this.isLoggedIn = status
    },
    logout() {
      this.isLoggedIn = false
    },
    skip() {
      this.skipAgePage = true
    },
  }
})