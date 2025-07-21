<?php
session_start();

// 检查用户是否已登录且角色为管理员
if (!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== true || $_SESSION['role'] !== 'admin') {
    // 未授权访问，重定向到登录页面
    header('Location: ../login.php');
    exit;
}
?>
