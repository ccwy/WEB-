<?php
session_start();
// 如果用户已登录，根据角色跳转到相应页面
if (isset($_SESSION['user_logged_in']) && $_SESSION['user_logged_in'] === true) {
    if ($_SESSION['role'] === 'admin') {
        header('Location: admin/');
    } else {
        header('Location: user-public/');
    }
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 连接数据库（实际应用中应使用配置文件）
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "your_database";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }

    $user_input = $_POST['username'];
    $pass_input = $_POST['password'];

    // 查询用户
    $stmt = $conn->prepare("SELECT id, username, password, role FROM USER WHERE username = ?");
    $stmt->bind_param("s", $user_input);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // 验证密码（实际应用中应使用password_verify()）
        if ($pass_input === $user['password']) {
            // 设置会话变量
            $_SESSION['user_logged_in'] = true;
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            // 根据角色跳转到相应页面
            if ($user['role'] === 'admin') {
                header('Location: admin/');
            } else {
                header('Location: user-public/');
            }
            exit;
        } else {
            $error = "用户名或密码不正确";
        }
    } else {
        $error = "用户名或密码不正确";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <style>
        .login-container {
            width: 300px;
            margin: 100px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
        .error {
            color: red;
            margin-bottom: 15px;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>用户登录</h2>
        <?php if ($error): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>
        <form method="post">
            <div class="form-group">
                <label for="username">用户名:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">密码:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
</body>
</html>
