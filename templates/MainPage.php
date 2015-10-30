<?
$catalog = $db->selectAll("catalog"); //parameter => json file (tablename), key, value
?>


<div class="row fluid">
    <div class="col-md-12">
        <div class="b-main-slider">
            <ul class="items">
                <li class="item">
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
                </li>
                <li class="item"></li>
            </ul>
        </div>
    </div>
</div>
<div class="row fluid b-product-cards">
    <div class="col-md-12 headers">
        <div class="item current">Хиты продаж</div>
        <div class="item dashed">Специальные предложения</div>
        <div class="item small">Весь каталог</div>
    </div>
    <div class="col-md-12 cards-wrapper">
        <div class="cards">
            <?
            foreach ($catalog as $item) {
                echo '<div class="card">
                <div class="marker">Хит</div>
                <div class="image-wrapper">
                    <img class="image" src="' . $item['imageUrl'] . '" alt="">
                </div>
                <a class="category" href="/">' . $item['title'] . '</a>

                <p class="price-wrapper">
					<span class="price">
						' . $item['price'] . '
					</span>
                    <span class="rub">q</span>
					<span class="price old">
						' . $item['oldPrice'] . '
					</span>
                    <span class="rub old">q</span>
                </p>
            </div>';
            }
            ?>
        </div>
    </div>
</div>
<div class="row fluid b-product-cards">
    <div class="col-md-12 headers">
        <div class="item">IP камеры</div>
        <div class="item small">Весь каталог</div>
    </div>
    <div class="col-md-12 cards-wrapper">
        <div class="cards">
            <div class="card">
                <div class="marker">Хит</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
            <div class="card">
                <div class="marker discount">%</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
            <div class="card">
                <div class="marker">Хит</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
            <div class="card">
                <div class="marker">Хит</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
            <div class="card">
                <div class="marker">Хит</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card2.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
</div>
<div class="row fluid b-product-cards">
    <div class="col-md-12 headers">
        <div class="item">Порошковые огнетушители</div>
    </div>
    <div class="col-md-12 cards-wrapper">
        <div class="cards">
            <div class="card">
                <div class="marker new">Новинка</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
            <div class="card">
                <div class="marker discount">%</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
            <div class="card">
                <div class="marker">Хит</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
            <div class="card">
                <div class="marker">Хит</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
            <div class="card">
                <div class="marker">Хит</div>
                <div class="image-wrapper">
                    <img class="image" src="<? echo $imageFolder; ?>card3.jpg" alt="">
                </div>
                <a class="category" href="/">Камера видеонаблюдения</a>
                <a class="name" href="/">FALCON EYE FE-D80C</a>

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
