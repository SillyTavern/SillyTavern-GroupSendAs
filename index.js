/**
 * Add the send as button to the group chat member icons.
 * @returns {void}
 */
function addSendAsButton() {
    const button = document.createElement('div');
    button.title = 'Send as a character';
    button.classList.add('send_as', 'right_menu_button', 'fa-solid', 'fa-quote-right');
    button.setAttribute('data-i18n', '[title]Send as a character');
    const template = document.querySelector('#group_member_template .group_member_icon');
    if (!template) return;
    template.prepend(button);
}

/**
 * Add event listener to the document.
 * @returns {void}
 */
function addEventListener() {
    document.addEventListener('click', function (event) {
        if (event.target instanceof HTMLElement && event.target.matches('.send_as')) {
            onSendAsButtonClick(event);
        }
    });
}

/**
 * Handle the click event on the send as button.
 * @param {Event} event Click event
 * @returns {void}
 */
function onSendAsButtonClick(event) {
    const textArea = document.getElementById('send_textarea');
    if (!textArea || !(textArea instanceof HTMLTextAreaElement)) return;
    const characterName = getCharacterName(event.target);
    textArea.value = `/sendas name="${characterName}" ${textArea.value}`;
    textArea.focus();
}

/**
 * Get the character name of the clicked group member.
 * @param {EventTarget | null} target Click event target
 * @returns {string} Character name
 */
function getCharacterName(target) {
    if (!(target instanceof HTMLElement)) return '';
    const member = target.closest('.group_member');
    if (!member) return '';
    const nameElement = member.querySelector('.group_member_name .ch_name');
    return nameElement?.textContent || '';
}

/**
 * Main function to run the extension.
 */
(function () {
    addSendAsButton();
    addEventListener();
})();
