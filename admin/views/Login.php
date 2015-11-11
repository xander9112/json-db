<?
$urlPrefix = '/admin';
$urlAssets = $urlPrefix . '/site/assets'
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Админка для создания рыбы</title>
    <link rel="stylesheet" type="text/css" href="<?= $urlAssets; ?>/css/styles.css">
</head>
<body class="js-application b-login">
<div class="ui middle aligned center aligned grid">
    <div class="column">
        <h2 class="ui teal image header">
            <img src="<?=$urlAssets?>/images/logo.png" class="image">

            <div class="content">
                Log-in to your account
            </div>
        </h2>
        <form class="ui large form">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="email" placeholder="E-mail address">
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="Password">
                    </div>
                </div>
                <div class="ui fluid large teal submit button">Login</div>
            </div>

            <div class="ui error message"></div>

        </form>

        <div class="ui message">
            New to us? <a href="#">Sign Up</a>
        </div>
    </div>
</div>
<script src="site/assets/js/vendor.js"></script>
<!--<script src="site/assets/js/app.js"></script>-->
</body>
</html>
