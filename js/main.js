(function() {
	'use strict';

	var draggedEl,
		onDragStart,
		onDrag,
		onDragEnd,
		grabPointY,
		grabPointX,
		createNote,
		addBtnEl,
		init,
		testLocalStorage,
		saveNote,
		deleteNote,
		loadNotes;

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
			saveBtnEl = document.createElement('button'),
			deleteBtnEl = document.createElement('button'),
			onSave,
			onDelete;

		onDelete = function() {
			var obj = {};
			deleteNote(obj);
		}

		onSave = function() {
			var obj = {};
			saveNote(obj);
		}

		saveBtnEl.addEventListener('click', onSave);
		deleteBtnEl.addEventListener('click', onDelete);

		saveBtnEl.classList.add('save-button');
		deleteBtnEl.classList.add('delete-button');

		var	transformCSSValue = "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)";


		barEl.classList.add('bar');
		stickerEl.classList.add('sticker');

		barEl.appendChild(saveBtnEl);
		barEl.appendChild(deleteBtnEl);

		stickerEl.appendChild(barEl);
		stickerEl.appendChild(textareaEl);

		stickerEl.style.transform = transformCSSValue;

		stickerEl.addEventListener('mousedown', onDragStart, false);

		document.body.appendChild(stickerEl);
	}

	testLocalStorage = function() {
		var foo = 'foo';

		try {
			localStorage.setItem(foo, foo);
			localStorage.removeItem(foo);
			return true;
		} catch (e) {
			return false;
		}
	}

	init = function() {

	if (!testLocalStorage()) {
		var message = "We are sorry you cannot use localStorage";
	} else {
		saveNote = function(note) {

		};

		deleteNote = function(note) {

		};

		loadNotes = function() {

		};

		loadNotes();
	}
		addBtnEl = document.querySelector('.add-note-btn')
		addBtnEl.addEventListener('click', createNote);
		document.addEventListener('mousemove', onDrag, false);
		document.addEventListener('mouseup', onDragEnd, false);
	}

	init();
})();