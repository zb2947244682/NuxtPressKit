<template>
  <header class="header">
    <div class="logo">
      <NuxtLink to="/">用户系统</NuxtLink>
    </div>
    <nav class="nav">
      <ul>
        <li><NuxtLink to="/">首页</NuxtLink></li>
        <li><NuxtLink to="/login">登录</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// 头部组件
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
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
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.nav a:hover {
  color: #4CAF50;
}
</style>
