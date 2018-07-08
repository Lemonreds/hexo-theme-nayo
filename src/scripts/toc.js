//---------
// toc
//---------

import Utils from './utils'

exports.init = () => {

	initClickListener();
	initFixListener();
	initFollow();
}

function initClickListener() {

	const $tc = $('.toc-title'),
		$tl = $('.toc'),
		$sb = $(".sidebar");

	if($tl.length != 0){
		$sb.show()
	}else{
		return;
	}

	$tc.click(() => {
		if ($tl.is(':visible')) {
			$tl.hide();
		} else {
			$tl.show();
		}
	});
}

//滑动 固定Toc
function initFixListener() {
	$(window).scroll(() => {
		tocPosition()
	})
}

function tocPosition() {

	const $tc = $(".sidebar");

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

	let $toc_text = $('.toc-text');

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
		nav_height = $('.post-footer').offset().top - $(document).scrollTop();
	return (nav_height <= height);
}