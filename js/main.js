(function() {
	'use strict';

	var draggedEl,
		onDragStart,
		onDrag,
		onDragEnd,
		grabPointY,
		grabPointX,
		createNote,
		addBtnEl;

	onDragStart = function(ev) {
		var boundingClientRect;

		if (ev.target.className.indexOf('bar') === -1) {
			return;
		}

		draggedEl = this;

		boundingClientRect = draggedEl.getBoundingClientRect();

		grabPointY = boundingClientRect.top - ev.clientY;
		grabPointX = boundingClientRect.left - ev.clientX;
	};

	onDrag = function(ev) {
		if (!draggedEl) {
			return;
		}

		var posX = ev.clientX + grabPointX,
			posY = ev.clientY + grabPointY;

		if (posX < 0) {
			posX = 0;
		}

		if (posY < 0) {
			posY = 0;
		}

		draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
	}

	onDragEnd = function() {
		draggedEl = null;
		grabPointY = null;
		grabPointX = null;
	}

	createNote = function() {
		var stickerEl = document.createElement('div'),
			barEl = document.createElement('div'),
			textareaEl = document.createElement('textarea'),
			transformCSSValue = "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)";


		barEl.classList.add('bar');
		stickerEl.classList.add('sticker');

		stickerEl.appendChild(barEl);
		stickerEl.appendChild(textareaEl);

		stickerEl.style.transform = transformCSSValue;

		stickerEl.addEventListener('mousedown', onDragStart, false);

		document.body.appendChild(stickerEl);
	}

	addBtnEl = document.querySelector('.add-note-btn')
	addBtnEl.addEventListener('click', createNote);
	document.addEventListener('mousemove', onDrag, false);
	document.addEventListener('mouseup', onDragEnd, false);
})();