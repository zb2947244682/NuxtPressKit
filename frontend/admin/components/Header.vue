<template>
  <header class="admin-header">
    <div class="logo">
      <NuxtLink to="/">管理系统</NuxtLink>
    </div>
    <nav class="nav">
      <ul>
        <li><NuxtLink to="/">控制面板</NuxtLink></li>
        <li><NuxtLink to="/users">用户管理</NuxtLink></li>
        <li><NuxtLink to="/content">内容管理</NuxtLink></li>
        <li><NuxtLink to="/settings">系统设置</NuxtLink></li>
        <li><button @click="logout" class="logout-btn">退出登录</button></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const logout = () => {
  // 这里将来会添加实际的退出登录逻辑
  console.log('退出登录')
  // 退出登录后重定向到登录页面
  navigateTo('/login')
}
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #2c3e50;
  color: white;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav li {
  margin-left: 20px;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-btn {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.logout-btn:hover {
  background-color: white;
  color: #2c3e50;
}
</style>
