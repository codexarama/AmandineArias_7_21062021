// GENERATEUR tag
const tagsCollection = document.querySelector('#tags-result');
function createTag(selectedTag) {
  const tag = elmtFactory(
    'button',
    { class: 'tag-btn' },
    selectedTag.textContent,
    elmtFactory('i', { class: 'far fa-times-circle' })
  );
  tagsCollection.append(tag);
}
