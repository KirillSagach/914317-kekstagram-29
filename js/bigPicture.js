import { photoDescriptionsArray } from './thumbnail.js';

const pictures = document.querySelectorAll('.picture');

const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const body = document.querySelector('body');


const docFragment = document.createDocumentFragment();


function addThumbnailClick(picture, photoDesc) {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    bigPictureImg.firstElementChild.src = photoDesc.url;
    likesCount.textContent = photoDesc.likes;
    commentsCount.textContent = photoDesc.comments.length;
    socialCaption.textContent = photoDesc.description;

    photoDesc.comments.forEach((comment) => {
      const commentElement = socialComment.cloneNode(true);

      const socialPicture = commentElement.querySelector('.social__picture');
      const socialText = commentElement.querySelector('.social__text');

      socialPicture.src = comment.avatar;
      socialPicture.alt = comment.name;

      socialText.textContent = comment.message;

      docFragment.appendChild(commentElement);
    });
    socialComments.appendChild(docFragment);
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
  });
}

document.addEventListener('keydown', (evt) =>{
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

bigPictureCancel.addEventListener('click', () =>{
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

for (let i = 0; i < pictures.length; i++) {
  addThumbnailClick(pictures[i], photoDescriptionsArray[i]);
}
