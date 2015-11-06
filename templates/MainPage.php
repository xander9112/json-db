<?
$catalog = $db->selectAll("catalog2"); //parameter => json file (tablename), key, value
?>

<div class="row">
    <div class="col-md-10">
        <div class="b-main-slider js-main-slider">
            <div class="left-button js-backward-button">
                <span class="g-icon g-icon-small-arrow-left navigate-icon"></span>
            </div>
            <div class="right-button js-forward-button">
                <span class="g-icon g-icon-small-arrow-right navigate-icon"></span>
            </div>
            <div class="pages js-pages">
                <div class="page active js-page"></div>
                <div class="page js-page"></div>
            </div>
            <div class="outer js-inner">
                <div class="items js-items">
                    <div class="item js-item">
                        <div class="inner">
                            <h3 class="slider-header">
                                Уникальные условия и цены
                                при комплексной
                                поставке оборудования
                            </h3>

                            <p class="slider-text">
                                Чтобы всегда покупать дешевле всех и получать другие преимущества —
                                вступайте в наш клуб
                            </p>
                            <a class="link">
                                Подробнее
                            </a>
                            <img class="image" src="<? echo $imageFolder; ?>slide1.png" alt="">
                        </div>
                    </div>
                    <div class="item js-item">
                        <div class="inner">
                            <h3 class="slider-header">
                                Текст
                                для
                                второго слайда
                            </h3>

                            <p class="slider-text">
                                Чтобы всегда покупать дешевле всех и получать другие преимущества —
                                вступайте в наш клуб
                            </p>
                            <a class="link">
                                Подробнее
                            </a>
                            <img class="image" src="<? echo $imageFolder; ?>slide1.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row b-product-cards">
    <div class="col-md-10 b-headers-list">
        <div class="item current">Хиты продаж</div>
        <div class="item dashed">Специальные предложения</div>
        <div class="item small">Весь каталог</div>
    </div>
    <div class="col-md-10 cards-wrapper js-slider">
        <div class="left-button js-backward-button">
            <span class="g-icon g-icon-small-arrow-left navigate-icon"></span>
        </div>
        <div class="right-button js-forward-button">
            <span class="g-icon g-icon-small-arrow-right navigate-icon"></span>
        </div>
        <div class="inner js-inner">
            <div class="cards js-items">
                <? foreach ($catalog as $item) { ?>
                    <div class="card js-item" data-id="<?= $item['id']['value'] ?>">
                        <div class="marker">Хит</div>
                        <div class="image-wrapper">
                            <img class="image" src="<?= $imageFolder . $item['image']['value'] ?>" alt="">
                        </div>
                        <a href="/" class="link">
                            <p class="category"><?= $item['title']['value'] ?></p>
                        </a>

                        <p class="price-wrapper">
						<span class="price">
							<?= $item['price']['value'] ?>
						</span>
                            <span class="rub">q</span>
                            <? if ($item['oldPrice']['value'] !== "") { ?>
                                <span class="price old">
                                    <?= $item['oldPrice']['value'] ?>
						        </span>
                                <span class="rub old">q</span>
                            <? } ?>
                        </p>
                    </div>
                <? } ?>
            </div>
            <div class="progress-wrapper js-progress-wrapper">
                <div class="progress js-progress"></div>
            </div>
        </div>
    </div>
</div>
<div class="row fluid b-product-cards">
    <div class="col-md-10 b-headers-list">
        <div class="item">IP камеры</div>
        <div class="item small">Весь каталог</div>
    </div>
    <div class="col-md-10 cards-wrapper js-slider">
        <div class="left-button js-backward-button">
            <span class="g-icon g-icon-small-arrow-left navigate-icon"></span>
        </div>
        <div class="right-button js-forward-button">
            <span class="g-icon g-icon-small-arrow-right navigate-icon"></span>
        </div>
        <div class="inner js-inner">
            <div class="cards js-items">
                <div class="card js-item">
                    <div class="marker">Хит</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
                <div class="card js-item">
                    <div class="marker discount">%</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
                <div class="card js-item">
                    <div class="marker">Хит</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
                <div class="card js-item">
                    <div class="marker">Хит</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
                <div class="card js-item">
                    <div class="marker">Хит</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="progress-wrapper js-progress-wrapper">
            <div class="progress js-progress"></div>
        </div>
    </div>
</div>
<div class="row fluid b-product-cards">
    <div class="col-md-10 b-headers-list">
        <div class="item">Порошковые огнетушители</div>
    </div>
    <div class="col-md-10 cards-wrapper js-slider">
        <div class="left-button js-backward-button">
            <span class="g-icon g-icon-small-arrow-left navigate-icon"></span>
        </div>
        <div class="right-button js-forward-button">
            <span class="g-icon g-icon-small-arrow-right navigate-icon"></span>
        </div>
        <div class="inner js-inner">
            <div class="cards js-items">
                <div class="card js-item">
                    <div class="marker new">Новинка</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
                <div class="card js-item">
                    <div class="marker discount">%</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
                <div class="card js-item">
                    <div class="marker">Хит</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
                <div class="card js-item">
                    <div class="marker">Хит</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
                <div class="card js-item">
                    <div class="marker">Хит</div>
                    <div class="image-wrapper">
                        <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                    </div>
                    <a href="/" class="link">
                        <p class="category">Камера видеонаблюдения</p>

                        <p class="name">FALCON EYE FE-D80C</p>
                    </a>

                    <p class="price-wrapper">
						<span class="price">
							910
						</span>
                        <span class="rub">q</span>
						<span class="price old">
							910
						</span>
                        <span class="rub old">q</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="progress-wrapper js-progress-wrapper">
            <div class="progress js-progress"></div>
        </div>
    </div>
</div>


<div class="b-bottom-banners">
    <h4 class="name">Секретные элементы</h4>

    <div class="content-block">
        <div class="icon-wrapper">
            <span class="icon g-icon g-icon-pig"></span>
        </div>
        <div class="text-wrapper">
            <p class="block-name">Достойная цена</p>

            <p class="text">
                Гордостью нашей компании является ее команда, составленная из лучших профессионалов в теплотехнической
                отрасли, и мы уверены, что вы по достоинству оцените простоту и удобство работы с нашим коллективом.
            </p>
        </div>
    </div>
    <div class="content-block">
        <div class="icon-wrapper">
            <span class="icon g-icon g-icon-thumb-up"></span>
        </div>
        <div class="text-wrapper">
            <p class="block-name">Высшее качество</p>

            <p class="text">
                Гордостью нашей компании является ее команда, составленная из лучших профессионалов в теплотехнической
                отрасли, и мы уверены, что вы по достоинству оцените простоту и удобство работы с нашим коллективом.
            </p>
        </div>
    </div>
    <div class="content-block">
        <div class="icon-wrapper">
            <span class="icon g-icon g-icon-man"></span>
        </div>
        <div class="text-wrapper">
            <p class="block-name">Персональный менеджер</p>

            <p class="text">
                Гордостью нашей компании является ее команда, составленная из лучших профессионалов в теплотехнической
                отрасли, и мы уверены, что вы по достоинству оцените простоту и удобство работы с нашим коллективом.
            </p>
        </div>
    </div>
    <div class="content-block">
        <div class="icon-wrapper">
            <span class="icon g-icon g-icon-truck"></span>
        </div>
        <div class="text-wrapper">
            <p class="block-name">Аккуратная доставка</p>

            <p class="text">
                Гордостью нашей компании является ее команда, составленная из лучших профессионалов в теплотехнической
                отрасли, и мы уверены, что вы по достоинству оцените простоту и удобство работы с нашим коллективом.
            </p>
        </div>
    </div>
    <div class="content-block">
        <div class="icon-wrapper">
            <span class="icon g-icon g-icon-pliers"></span>
        </div>
        <div class="text-wrapper">
            <p class="block-name">Профессиональный монтаж </p>

            <p class="text">
                Гордостью нашей компании является ее команда, составленная из лучших профессионалов в теплотехнической
                отрасли, и мы уверены, что вы по достоинству оцените простоту и удобство работы с нашим коллективом.
            </p>
        </div>
    </div>
</div>
