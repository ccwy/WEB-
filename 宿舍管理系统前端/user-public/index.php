<?php
// 引入用户权限验证
require_once 'auth.php';
?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>用户中心</title>
    <style>
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>用户中心</h1>
            <div>
                <span>欢迎, <?php echo $_SESSION['username']; ?></span>
                <a href="../logout.php">退出登录</a>
            </div>
        </div>
        <div class="content">
            <h2>用户功能区域</h2>
            <!-- 用户功能内容 -->
        </div>
    </div>
</body>
</html>
