// V 使用者可以從登入頁面登入，並轉到後台商品頁面
// V 使用者若無登入直接進入商品頁面，會被導回登入頁面
// V 使用者可以查看產品列表
// V 使用者可以點擊單一產品，查看詳細資訊

const url = 'https://vue3-course-api.hexschool.io/v2'; // 加入站點
const path = 'ziyi'; // 加入個人API Path


// 產品資料格式
const products = [];

// cookie帶入token
// let token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

// token帶入axios，發送api
// axios.defaults.headers.common['Authorization'] = token;

// function checkLogin(){
//   // console.log(token);
//   axios.post(`${url}/api/user/check`)
//     .then((res) => {
//       console.log('已登入');
//     })
//     .catch((err) => {
//       console.log('未登入');
//       window.location = './login.html';
//     })
// }
// checkLogin();


// function getProducts(){
//   axios.get(`${url}/api/${path}/admin/products`)
//     .then((res) => {
//       console.log(res.data.products);
//       products = res.data.products;
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }
// getProducts();



// 建立元件
const { createApp } = Vue;

// Vue生成
createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      path: 'ziyi',
      products,
      tempProduct: [],
    }
  },
  methods: {
    // 取得產品列表
    getProducts() {
      axios.get(`${this.url}/v2/api/${this.path}/admin/products`)
        .then(res => {
          console.log(res.data.products);
          this.products = res.data.products; // 產品資料傳入products
          console.log(this.products.length);
        })
        .catch(err => {
          console.log(err);
        })
    },
    // 確認身份
    checkAdmin() {
      axios.post(`${this.url}/v2/api/user/check`)
        .then(res => {
          console.log('身份驗證成功');
          this.getProducts(); // 身份驗證成功以顯示產品列表
        })
        .catch(err => {
          console.log('身份驗證失敗');
          alert('請登入');
          window.location = './login.html'; // 身份驗證失敗轉跳登入頁面
        })
     }
  },
  mounted() {
    // cookie帶入token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // token帶入axios，發送api
    axios.defaults.headers.common['Authorization'] = token;
    // 確認身份
    this.checkAdmin();
  }
}).mount('#app');



// 格式
// createApp({
//   data(){ // 資料集
//   },
//   methods: { // 函式集
//   },
//   mounted(){ // 初始化後執行
//   }
// })