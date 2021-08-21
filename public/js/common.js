"use strict";

let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, {
			passive: true
		});
	},

	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}
	},

	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)

			let link = event.target.closest(".menu-mobile .menu a"); // (1)

			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)

			if (!container && !toggle) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},

	// /mobileMenu
	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;
		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})
		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active');
		});
	},

	// /tabs
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	}

};
const $ = jQuery;

function eventHandler() {
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow(); // JSCCommon.CustomInputFile();
	// var x = window.location.host;
	// let screenName;
	// screenName = document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }
	// modal window
	//luckyoneJs

	let topNav = document.querySelector(".top-nav--js");
	let headerH = 0;

	function calcHeaderHeight() {
		document.documentElement.style.setProperty('--header-h', "".concat(topNav.offsetHeight, "px"));
		headerH = topNav.offsetHeight;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}

	window.addEventListener('resize', calcHeaderHeight, {
		passive: true
	});
	window.addEventListener('scroll', calcHeaderHeight, {
		passive: true
	});
	calcHeaderHeight(); //aside menu js

	let sidebarBoxes = document.querySelectorAll('.sidebar-box-js');
	let sidebarLinks = document.querySelectorAll('.sb-link-js');
	let sidebarSubLinks = document.querySelectorAll('.sb-sub-box-js a');
	let sidebarSubBoxes = document.querySelectorAll('.sub-box-js');

	function setSidebarAncorsWork() {
		//heavy js, off down lg
		if (window.matchMedia("(max-width: 992px)").matches) return;
		SidebarAncors(sidebarBoxes, sidebarLinks);
		SidebarAncors(sidebarSubBoxes, sidebarSubLinks);
		let activeLink;

		for (let link of sidebarSubLinks) {
			if ($(link).hasClass('active')) {
				activeLink = link;
			}
		} //


		let currItem = activeLink.closest('.sb-item-js');
		let currBox = document.querySelector($(currItem).find('.sb-link-js').attr('href'));
		let prevBox = document.querySelector($(currItem.previousElementSibling).find('.sb-link-js').attr('href'));
		let prevBoxHasSubBoxes = prevBox.querySelectorAll('.sub-box-js').length > 0;
		let prevBoxIsActive = $(currItem.previousElementSibling).find('.sb-link-js').hasClass('active');
		let nextBox = document.querySelector($(currItem.nextElementSibling).find('.sb-link-js').attr('href'));
		let nextBoxHasSubBoxes = nextBox.querySelectorAll('.sub-box-js').length > 0;
		let nextBoxIsActive = $(currItem.nextElementSibling).find('.sb-link-js').hasClass('active');
		console.log(prevBoxHasSubBoxes);
		console.log(prevBoxIsActive);

		if (!prevBoxHasSubBoxes && prevBoxIsActive || !nextBoxHasSubBoxes && nextBoxIsActive) {
			$(sidebarSubLinks).removeClass('active');
		}
	}

	function SidebarAncors(boxes, links) {
		let distance = [];

		for (let item of boxes) {
			let itemTop = item.getBoundingClientRect().top - headerH;
			distance.push(Math.abs(itemTop));
		} //-


		let min = distance[0];
		let minIndex = 0;
		$(distance).each(function () {
			if (this < min) {
				min = this;
				minIndex = $(distance).index(this);
			}
		});
		$(links).removeClass('active');
		$(links[minIndex]).addClass('active');
	}

	if (sidebarLinks.length > 0 && sidebarBoxes.length > 0) {
		setSidebarAncorsWork();
		document.addEventListener('scroll', setSidebarAncorsWork, {
			passive: true
		});
		document.addEventListener('resize', setSidebarAncorsWork, {
			passive: true
		});
	} //subBoxes


	$('.sb-sub-box-js a').click(function () {
		event.preventDefault();
		let box = document.querySelector($(this).attr('href'));
		let subBoxes = box.querySelectorAll('.sub-box-js');
		let index = $(this.parentElement).index();
		let destination = $(subBoxes[index]).offset().top - 10 - headerH;
		$('html, body').animate({
			scrollTop: destination
		}, 0);
	}); //animate scroll

	$(document).on('click', ".scroll-link", function () {
		let elHref = $(this).attr("href");
		let target = document.querySelector(elHref);
		let destination = $(target).offset().top - 10 - headerH;
		$('html, body').animate({
			scrollTop: destination
		}, 0);
		return false;
	}); //end luckyoneJs
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}