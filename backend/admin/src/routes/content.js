const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 验证令牌中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '未提供认证令牌' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, admin) => {
    if (err) {
      return res.status(403).json({ message: '令牌无效或已过期' });
    }
    
    // 检查是否是管理员
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: '没有管理员权限' });
    }
    
    req.admin = admin;
    next();
  });
};

// 模拟内容数据，实际项目中应该从数据库获取
let contents = [
  {
    id: 1,
    title: '示例文章1',
    content: '这是示例文章1的内容。',
    author: 'admin',
    category: '新闻',
    tags: ['示例', '文章'],
    status: 'published',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: '示例文章2',
    content: '这是示例文章2的内容。',
    author: 'admin',
    category: '公告',
    tags: ['示例', '公告'],
    status: 'draft',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z'
  }
];

// 获取所有内容
router.get('/', authenticateToken, (req, res) => {
  // 实际项目中应该支持分页、排序和过滤
  res.json(contents);
});

// 获取特定内容
router.get('/:id', authenticateToken, (req, res) => {
  const contentId = parseInt(req.params.id);
  const content = contents.find(c => c.id === contentId);
  
  if (!content) {
    return res.status(404).json({ message: '内容不存在' });
  }
  
  res.json(content);
});

// 创建内容
router.post('/', authenticateToken, (req, res) => {
  try {
    const { title, content, category, tags, status } = req.body;
    
    // 验证必填字段
    if (!title || !content) {
      return res.status(400).json({ message: '标题和内容为必填项' });
    }
    
    // 创建新内容
    const newContent = {
      id: contents.length > 0 ? Math.max(...contents.map(c => c.id)) + 1 : 1,
      title,
      content,
      author: req.admin.username,
      category: category || '未分类',
      tags: tags || [],
      status: status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // 添加到内容列表
    contents.push(newContent);
    
    res.status(201).json(newContent);
  } catch (error) {
    console.error('创建内容错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新内容
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const contentId = parseInt(req.params.id);
    const { title, content, category, tags, status } = req.body;
    
    // 查找内容
    const contentIndex = contents.findIndex(c => c.id === contentId);
    if (contentIndex === -1) {
      return res.status(404).json({ message: '内容不存在' });
    }
    
    // 更新内容信息
    const updatedContent = {
      ...contents[contentIndex],
      title: title || contents[contentIndex].title,
      content: content || contents[contentIndex].content,
      category: category || contents[contentIndex].category,
      tags: tags || contents[contentIndex].tags,
      status: status || contents[contentIndex].status,
      updatedAt: new Date().toISOString()
    };
    
    // 更新内容列表
    contents[contentIndex] = updatedContent;
    
    res.json(updatedContent);
  } catch (error) {
    console.error('更新内容错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除内容
router.delete('/:id', authenticateToken, (req, res) => {
  const contentId = parseInt(req.params.id);
  
  // 查找内容
  const contentIndex = contents.findIndex(c => c.id === contentId);
  if (contentIndex === -1) {
    return res.status(404).json({ message: '内容不存在' });
  }
  
  // 删除内容
  contents.splice(contentIndex, 1);
  
  res.json({ message: '内容已删除' });
});

module.exports = router;
