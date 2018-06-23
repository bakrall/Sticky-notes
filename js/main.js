(function() {
	'use strict';

	var draggedEl,
		onDragStart,
		onDrag,
		onDragEnd,
		grabPointY,
		grabPointX,
		createNote,
		addNoteBtnEl,
		init,
		testLocalStorage,
		saveNote,
		deleteNote,
		loadNotes,
		getNoteObject,
		onAddNoteBtnClick;

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

	getNoteObject = function(el) {
		var textarea = el.querySelector('textarea');

		return {
			content: textarea.value,
			id: el.id,
			transformCSSValue: el.style.transform
		}
	}

	createNote = function(options) {
		var stickerEl = document.createElement('div'),
			barEl = document.createElement('div'),
			textareaEl = document.createElement('textarea'),
			saveBtnEl = document.createElement('button'),
			deleteBtnEl = document.createElement('button'),
			onSave,
			onDelete,
			BOUNDARIES = 400,
			noteConfig = options || {
				content:'',
				id: 'sticker_' + new Date().getTime(),
				transformCSSValue: "translateX(" + Math.random() * BOUNDARIES + "px) translateY(" + Math.random() * BOUNDARIES + "px)"
			};

		onDelete = function() {
			var obj = {};
			deleteNote(obj);
		}

		onSave = function() {
			saveNote(
				getNoteObject(stickerEl)
			);
		}

		stickerEl.id = noteConfig.id;
		textareaEl.value = noteConfig.content;

		barEl.classList.add('bar');
		stickerEl.classList.add('sticker');

		stickerEl.appendChild(barEl);
		stickerEl.appendChild(textareaEl);

		barEl.appendChild(saveBtnEl);
		barEl.appendChild(deleteBtnEl);

		saveBtnEl.addEventListener('click', onSave);
		deleteBtnEl.addEventListener('click', onDelete);

		saveBtnEl.classList.add('save-button');
		deleteBtnEl.classList.add('delete-button');

		stickerEl.addEventListener('mousedown', onDragStart, false);

		document.body.appendChild(stickerEl);

		stickerEl.style.transform = noteConfig.transformCSSValue;
	}

	testLocalStorage = function() {
		var foo = 'foo';
		try {
			localStorage.setItem(foo, foo);
			localStorage.removeItem(foo);
			return true;
		} catch(e) {
			return false;
		}
	}

	onAddNoteBtnClick = function() {
		createNote();
	}

	init = function() {
		if (!testLocalStorage()) {
			var message = "You cannot use localStorage";
		} else {
			saveNote = function(note) {
				localStorage.setItem(note.id, note);
			};

			deleteNote = function(note) {

			};

			loadNotes = function(note) {

			};
		}

		addNoteBtnEl = document.querySelector('.add-note-btn')
		addNoteBtnEl.addEventListener('click', onAddNoteBtnClick, false);
		document.addEventListener('mousemove', onDrag, false);
		document.addEventListener('mouseup', onDragEnd, false);
	}

	init();
})();