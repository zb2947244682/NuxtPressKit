<template>
  <div class="container">
    <Header />
    <main>
      <div class="login-form">
        <h2>用户登录</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">用户名</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              required 
              placeholder="请输入用户名"
            />
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required 
              placeholder="请输入密码"
            />
          </div>
          <div class="form-actions">
            <button type="submit" class="button">登录</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // 这里将来会添加实际的登录逻辑
    console.log('登录信息:', { username: username.value, password: password.value })
    // 登录成功后重定向到首页
    navigateTo('/')
  } catch (error) {
    console.error('登录失败:', error)
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-actions {
  margin-top: 30px;
  text-align: center;
}

.button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.button:hover {
  background-color: #45a049;
}
</style>
