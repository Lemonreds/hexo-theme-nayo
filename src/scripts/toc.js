//---------
// toc
//---------

exports.init = () => {

	const $tocSider=$('.toc-sidebar'),
		$tocTitle = $('.toc-title'),
		$tocList = $('.toc-list')

	// 仅在post页启用脚本
	if(!$tocList[0])return;
	// 当toc目录有内容的时候才显示toc容器
	if($tocList[0].innerHTML.trim() !== ''){
		$tocSider.show()
	}else return
	// 绑定点击 显示/隐藏 toc 功能
	$tocTitle.click(() => {
		if ($tocList.is(':visible')) {
			$tocList.hide();
		} else {
			$tocList.show();
		}
	});

	// 滑动 固定导航栏
	initFixListener()
	// toc目录根据阅读进度 跟随
	initFollow()
}


//滑动 固定Toc
function initFixListener() {
	$(window).scroll(() => {
		tocPosition()
	})
}

function tocPosition() {

	const $tc = $(".toc-container");

	if ($tc.length > 0) {
		//获取 toc 容器 到 document 的 距离
		let ot = $tc.offset().top,
			st = $(window).scrollTop();

		if (ot < st) {
			$tc.addClass('toc-fixed');
		}
		if (st < 90 || checkIsHideToc()) {
			$tc.removeClass('toc-fixed');
		}
	}
}

function initFollow() {

	const $headers = $('.post-content h1,.post-content h2,.post-content h3,.post-content h4,.post-content h5,.post-content h6')

	$(window).scroll(() => {
		$headers.each(function () {
			if (getOffsetTop($(this)) <= 40) {
				let text = $(this).text();
				highLight(text);
			}
		})
	})
}

function highLight(text) {

	let $toc_text = $('.toc-inner li');
	
	$toc_text.each(function () {
		if ($(this).text() === text) {
			$(this).addClass('toc-active');
		} else {
			$(this).removeClass('toc-active');
		}
	})

}

function getOffsetTop($obj) {
	const mTop = $obj.offset().top,
		sTop = $(window).scrollTop();
	return mTop - sTop;
}

function checkIsHideToc() {
	const height = $(window).height(),
		nav_height = $('.post-nav').offset().top - $(document).scrollTop();
	return (nav_height <= height);
}