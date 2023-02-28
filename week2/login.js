// V 使用者可以從登入頁面登入，並轉到後台商品頁面
// 使用者若無登入直接進入商品頁面，會被導回登入頁面
// 使用者可以查看產品列表
// 使用者可以點擊單一產品，查看詳細資訊

// const url = 'https://vue3-course-api.hexschool.io';
// const path = 'ziyi';

// // DOMs
// const emailInput = document.querySelector('#username');
// const passwordInput = document.querySelector('#password');
// const loginBtn = document.querySelector('#login');

// loginBtn.addEventListener('click', login);

// function login(e) {
//   e.preventDefault();
//   const username = emailInput.value;
//   const password = passwordInput.value;

//   const user = {
//     username,
//     password
//   }
//   // console.log(user);

//   axios.post(`${url}/v2/admin/signin`, user)
//     .then(res => {
//       console.log(res.data.message);

//       const { token, expired } = res.data; // 取token與到期期限
//       axios.defaults.headers.common['Authorization'] = token; // token帶入axios權限
//       document.cookie = `hexToken=${token}; expires=${expired};`; // 建立cookie,並重新命名
      
//       window.location = './admin.html'; // 轉址
//     })
//     .catch(res =>{
//       console.log(err.data.message);
//     })
// }


const { createApp } = Vue;

createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      axios.post(`${this.url}/v2/admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message);

          // cookie處理，後續做驗證用
          // 宣告expired與token值
          // const expired = res.data.expired;
          // const token = res.data.token;
          // console.log(expired, token); // 取得時間及token
          const {expired, token} = res.data; // 解構賦值，expired與token值來自於res.data

          // 把資料存到cookie
          document.cookie = `hexToken=${token}; expires=${expired};`; // 建立cookie,並重新命名

          axios.defaults.headers.common['Authorization'] = token; // token帶入axios權限

          // 轉址處理
          window.location = './admin.html';
        })
        .catch((err) => {
          alert(err.data.message);
        })
    }
  }
}).mount('#app');