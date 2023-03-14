<template>
  <div class="big-container">
    <div class="container">
      <div class="con-box">
        <h1>欢迎来到嘉雲</h1>
        <!-- <p>欢迎光临, 请输入您的账号和密码进行登录!</p> -->
        <p>没有账号？</p>
        <button id="register" @click="handleToRegister">去注册</button>
      </div>
      <div class="con-box">
        <h1>欢迎来到嘉雲</h1>
        <p>已有账号？</p>
        <button id="login" @click="handleToLogin">去登录</button>
      </div>
      <div ref="formBox" class="form-box">
        <div ref="loginFormDom" class="loginFormBox">
          <h1 class="bigH1">Login</h1>
          <div class="svg-form">
            <!-- SVG提前准备好, 来自互联网 -->
            <svg viewBox="0 0 320 300">
              <defs>
                <!-- 定义线性渐变 -->
                <linearGradient
                  id="linearGradient1"
                  inkscape:collect="always"
                  x1="13"
                  y1="193.49992"
                  x2="307"
                  y2="193.49992"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop style="stop-color: #0ff" offset="0" />
                  <stop style="stop-color: #f0f" offset="1" />
                </linearGradient>
              </defs>
              <path
                d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
              />
            </svg>
            <el-form class="form-login" :rules="rules" :model="loginForm">
              <el-form-item prop="username">
                <label for="account">邮箱</label>
                <el-input
                  id="account"
                  v-model="loginForm.username"
                  type="text"
                  autocomplete="new-password"
                  @click="accountClick"
                  @focus="accountFocus"
                />
              </el-form-item>
              <el-form-item>
                <label for="password">密码</label>
                <el-input
                  v-model="loginForm.password"
                  show-password
                  autocomplete="off"
                  @click="pwdClick"
                  @focus="pwdFocus"
                />
              </el-form-item>
              <el-form-item>
                <button
                  type="button"
                  @mouseover="submitOver"
                  @focus="submitFocus"
                  @click="handleLogin"
                  >登录</button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div ref="registerFormDom" class="form-register newHidden">
          <h1 class="bigH1">Register</h1>
          <div>
            <label for="email">邮箱</label>
            <el-input
              id="email"
              v-model="registerForm.username"
              type="text"
              autocomplete="new-password"
            />
            <button class="register-button" @click="handleSendCode">发送验证码</button>
            <label for="code">验证码</label>
            <el-input
              id="code"
              v-model="registerForm.code"
              type="text"
              minlength="6"
              maxlength="6"
              autocomplete="new-password"
            />
            <label for="password">密码</label>
            <el-input v-model="registerForm.password" show-password autocomplete="off" />
            <button class="register-button" @click="handleRegister">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import anime from 'animejs';
  import { useRouter } from 'vue-router';
  import { ElMessage, ElLoading } from 'element-plus';
  import request from '@/hooks/http';

  //#region 页面交互部分
  // 定义一个anime对象
  let an = null;
  // 绑定账号输入框的点击事件
  function accountClick() {
    if (an) {
      // 如果已存在anime动画,先暂停正在运行的动画
      an.pause();
    }
    // 构造一个动画对象
    an = anime({
      targets: 'path',
      strokeDashoffset: {
        value: 0,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    });
  }
  // 绑定密码输入框的点击事件
  function pwdClick() {
    if (an) {
      // 如果已存在anime动画,先暂停正在运行的动画
      an.pause();
    }
    // 构造一个动画对象
    an = anime({
      targets: 'path',
      strokeDashoffset: {
        value: -336,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    });
  }
  // 绑定登录按钮的鼠标移入事件
  function submitOver() {
    if (an) {
      // 如果已存在anime动画,先暂停正在运行的动画
      an.pause();
    }
    // 构造一个动画对象
    an = anime({
      targets: 'path',
      strokeDashoffset: {
        value: -730,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '530 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    });
  }
  // 优化一下,输入框和登录按钮获取焦点也给动画
  // 绑定账号输入框的获取焦点事件
  function accountFocus() {
    if (an) {
      // 如果已存在anime动画,先暂停正在运行的动画
      an.pause();
    }
    // 构造一个动画对象
    an = anime({
      targets: 'path',
      strokeDashoffset: {
        value: 0,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    });
  }
  // 绑定密码输入框的获取焦点事件
  function pwdFocus() {
    if (an) {
      // 如果已存在anime动画,先暂停正在运行的动画
      an.pause();
    }
    // 构造一个动画对象
    an = anime({
      targets: 'path',
      strokeDashoffset: {
        value: -336,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    });
  }
  // 绑定登录按钮的获取焦点事件
  function submitFocus() {
    if (an) {
      // 如果已存在anime动画,先暂停正在运行的动画
      an.pause();
    }
    // 构造一个动画对象
    an = anime({
      targets: 'path',
      strokeDashoffset: {
        value: -730,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '530 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    });
  }

  const registerFormDom = ref();
  const loginFormDom = ref();
  const formBox = ref();
  // 点击去注册按钮
  function handleToRegister() {
    formBox.value.style.transform = 'translateX(10%)';
    loginFormDom.value.classList.add('newHidden');
    registerFormDom.value.classList.remove('newHidden');
  }
  // 点击去登录按钮
  function handleToLogin() {
    formBox.value.style.transform = 'translateX(90%)';
    registerFormDom.value.classList.add('newHidden');
    loginFormDom.value.classList.remove('newHidden');
  }
  //#endregion

  //#region 登录部分
  const router = useRouter();
  const loginForm = reactive({
    username: '',
    password: '',
  });
  function validateEmail(rule, value, callback) {
    if (value === '') {
      // callback(new Error('Please input the password'));
      callback();
    } else {
      callback();
    }
  }
  const rules = reactive({
    username: [{ validator: validateEmail, trigger: 'blur' }],
  });
  // function checkEmail(e) {
  //   console.log(e);
  // }
  async function handleLogin() {
    await request.post('/api/login', loginForm).then((res) => {
      if (res.status === 200) {
        if (res.data.status === 1) {
          const loading = ElLoading.service({
            background: 'rgba(0, 0, 0, 0)',
          });
          localStorage.setItem('routerTo', JSON.stringify(res));
          router.push('/');
          loading.close();
        } else {
          ElMessage({
            message: res.data.msg,
            type: 'error',
          });
        }
      } else {
        ElMessage({
          message: '请求失败，请联系管理员',
          type: 'error',
        });
      }
    });
  }

  //#endregion

  //#region 注册部分
  const registerForm = reactive({
    username: '',
    password: '',
    code: '',
  });
  // 注册请求
  async function handleRegister() {
    if (registerForm.username.length === 0) {
      return ElMessage({
        showClose: true,
        message: '请输入邮箱！',
        type: 'error',
      });
    } else if (registerForm.code.length === 0) {
      return ElMessage({
        showClose: true,
        message: '请输入验证码',
        type: 'error',
      });
    } else if (registerForm.password.length === 0) {
      return ElMessage({
        showClose: true,
        message: '请输入密码',
        type: 'error',
      });
    }
    await request
      .post('/api/register', registerForm)
      .then((res) => {
        if (res.status === 200) {
          ElMessage({
            message: res.data.msg,
            type: 'success',
          });
          handleToLogin();
        }
      })
      .catch((err) =>
        ElMessage({
          message: err,
          type: 'error',
        }),
      );
  }
  // 发送邮箱验证码
  async function handleSendCode() {
    const codeForm = {
      username: registerForm.username,
    };
    if (registerForm.username === '') {
      return ElMessage({
        showClose: true,
        message: '请输入邮箱！',
        type: 'error',
      });
    }
    await request
      .post('/api/code', codeForm)
      .then((res) => {
        if (res.data.status === 1) {
          ElMessage({
            message: res.data.msg,
            type: 'success',
          });
        } else {
          ElMessage({
            message: res.data.msg,
            type: 'warning',
          });
        }
      })
      .catch((err) =>
        ElMessage({
          message: err,
          type: 'error',
        }),
      );
  }
  //#endregion
</script>

<style lang="scss" scoped>
  @keyframes s {
    from {
      // transform: translateY(-100%);
      opacity: 0;
    }

    to {
      // transform: translateY(0%);
      opacity: 1;
    }
  }
  @keyframes mymove {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  * {
    /* 初始化 */
    margin: 0;
    padding: 0;
    user-select: none;
  }

  .big-container {
    background: url(@/assets/wallpaper.jpg) no-repeat;
    background-size: cover;
    height: 100vh;
    /* 弹性布局 居中显示 */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e2e2e5;
  }

  .container {
    width: 650px;
    height: 420px;
    display: flex;
    position: relative;
  }

  .con-box {
    width: 50%;
    height: calc(100% - 80px);
    // background-color: #fff;
    position: relative;
    top: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    border-radius: 5px;
  }

  .con-box h1 {
    color: #222;
    font-size: 35px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 55px 40px 40px 40px;
  }

  .bigH1 {
    text-align: center;
    color: #fff;
    font-size: 35px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 4px;
    // margin: 55px 40px 40px 40px;
  }

  .con-box p {
    color: #999;
    font-size: 14px;
    // margin: 20px;
    line-height: 22px;
  }

  .form-box {
    width: 320px;
    height: 100%;
    background-color: #474a59;
    color: #f1f1f1;
    position: absolute;
    box-shadow: 0 0 40px 16px rgba(0, 0, 0, 0.2);
    transform: translateX(90%);
    /* 动画过渡 加速后减速 */
    transition: 0.5s ease-in-out;
    border-radius: 5px;
    z-index: 2;
  }

  .loginFormBox {
    width: 100%;
    height: 100%;
    margin-top: 40px;
    position: relative;
    /* 动画过渡 加速后减速 */
    // transition: 0.5s;
    animation: s 0.5s;
  }

  .form-box svg {
    position: absolute;
    width: 320px;
  }

  .form-box path {
    /* 取消填充 */
    fill: none;
    /* 定义一条线,引用定义好的线性渐变 */
    stroke: url(#linearGradient1);
    /* 线的厚度 */
    stroke-width: 4;
    /* 设置虚线:虚线长度 间距 */
    stroke-dasharray: 240 1386;
  }

  .form-login,
  .form-register {
    width: 240px;
    // padding-top: 50px;
    margin: 35px 40px 40px 40px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // transition: 0.5s;
    animation: s 0.5s;
  }

  .form-login label {
    color: #c2c2c2;
    display: block;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 5px;
    // animation: s 0.5s;
  }

  // :deep(.el-input) {
  //   border: none !important;
  // }

  :deep(.el-input__wrapper) {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #f2f2f2;
    background-color: transparent;
    border: none !important;
    outline: none;
    text-indent: 2px;
    box-shadow: 0 0 0 0px;
    padding: 0;
  }

  :deep(.el-input__inner) {
    color: #f2f2f2 !important;
    border: 0 !important;
  }

  :deep(.form-register .el-input) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }

  button {
    width: 100%;
    height: 30px;
    color: #d0d0d0;
    font-size: 18px;
    background-color: transparent;
    border: none;
    margin-top: 40px;
    cursor: pointer;
    outline: none;
  }

  .newHidden {
    display: none;
    // opacity: 0;
    // opacity: 0;
    // height: 0;
    // padding: 0;
    // margin: 0;
    // animation: mymove forwards;
    // transition: 0.5s;
  }

  :deep(:-webkit-autofill) {
    transition: background-color 5000s ease-in-out 0s !important;
    -webkit-text-fill-color: #f2f2f2;
    // background-color: transparent !important;
    // -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  }

  .register-button {
    height: 50px;
    margin: 10px 0 10px 0;
    background-color: #f6f6f6;
    outline: none;
    border-radius: 25px;
    padding: 5px;
    color: #474a59;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
  }
</style>
