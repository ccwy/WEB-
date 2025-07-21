<?php
session_start();

// 检查用户是否已登录
if (!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== true) {
    // 未登录，重定向到登录页面
    header('Location: ../login.php');
    exit;
}
?>
