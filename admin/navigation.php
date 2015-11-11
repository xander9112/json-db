<div class="ui fixed inverted menu">
    <div class="ui container">
        <a href="/admin" class="header item">
            <img class="logo" src="<?= $urlAssets; ?>/images/logo_white.png">
            JsonDB - admin
        </a>
        <a href="views/Tables.php" class="item">Таблицы</a>

        <div class="ui simple dropdown item">
            Таблицы <i class="dropdown icon"></i>

            <div class="menu">
                <? foreach ($tables as $table) { ?>
                    <a class="item" href="/admin/views/Table.php?table=<?= $table; ?>"><?= $table; ?></a>
                <? } ?>
            </div>
        </div>
    </div>
    <div class="right menu">

        <a href="/" target="_blank" class="ui item">
            На сайт
        </a>
        <a class="ui item">
            Logout
        </a>
    </div>
</div>
