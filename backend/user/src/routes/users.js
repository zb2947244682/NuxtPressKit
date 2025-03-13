const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 模拟用户数据，实际项目中应该从数据库获取
const users = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    profile: {
      firstName: '张',
      lastName: '三',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: '这是一个示例用户'
    }
  }
];

// 验证令牌中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '未提供认证令牌' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: '令牌无效或已过期' });
    }
    req.user = user;
    next();
  });
};

// 获取所有用户（需要认证）
router.get('/', authenticateToken, (req, res) => {
  // 实际项目中应该分页并过滤敏感信息
  const safeUsers = users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    profile: user.profile
  }));
  
  res.json(safeUsers);
});

// 获取特定用户
router.get('/:id', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    profile: user.profile
  });
});

// 更新用户信息
router.put('/:id', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // 检查是否是当前用户或管理员
  if (req.user.id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ message: '没有权限更新此用户' });
  }
  
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  const { email, profile } = req.body;
  
  // 更新用户信息
  users[userIndex] = {
    ...users[userIndex],
    email: email || users[userIndex].email,
    profile: {
      ...users[userIndex].profile,
      ...profile
    }
  };
  
  res.json({
    message: '用户信息已更新',
    user: {
      id: users[userIndex].id,
      username: users[userIndex].username,
      email: users[userIndex].email,
      profile: users[userIndex].profile
    }
  });
});

// 删除用户
router.delete('/:id', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // 检查是否是当前用户或管理员
  if (req.user.id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ message: '没有权限删除此用户' });
  }
  
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  // 删除用户
  users.splice(userIndex, 1);
  
  res.json({ message: '用户已删除' });
});

module.exports = router;
