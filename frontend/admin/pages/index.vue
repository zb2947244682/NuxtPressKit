<template>
  <div class="container">
    <Header />
    <main>
      <h1>管理员控制面板</h1>
      <div class="dashboard">
        <div class="card">
          <h3>用户管理</h3>
          <p>管理系统用户，包括添加、编辑和删除用户。</p>
          <button class="btn">进入</button>
        </div>
        <div class="card">
          <h3>内容管理</h3>
          <p>管理系统内容，包括添加、编辑和删除内容。</p>
          <button class="btn">进入</button>
        </div>
        <div class="card">
          <h3>系统设置</h3>
          <p>配置系统参数，包括安全设置、通知设置等。</p>
          <button class="btn">进入</button>
        </div>
        <div class="card">
          <h3>数据统计</h3>
          <p>查看系统数据统计，包括用户活跃度、内容访问量等。</p>
          <button class="btn">进入</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 管理员首页组件
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

main {
  padding: 40px 0;
}

h1 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.card p {
  color: #666;
  margin-bottom: 20px;
}

.btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover {
  background-color: #2980b9;
}
</style>
