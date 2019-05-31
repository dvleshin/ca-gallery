'use strict';
var gProjId;

function initPage() {
    createProjects();
    renderProjs();
}

function renderProjs() {
    var projs = getgProjs();
    var strHtmls = projs.map(function (proj) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" onclick="onPutProjInfoModal('${proj.id}')" href="#portfolioModal">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.title}</h4>
        </div>
      </div>`
    })

    document.querySelector('div[data-content="portfolio"]').innerHTML = strHtmls.join('');

}

function onPutProjInfoModal(projId) {
    var proj = getProj(projId);

    var humanDate = convertTimestampToHumanDate(proj.publishedAt);
    document.querySelector('#portfolioModal h2').innerHTML = proj.title;
    document.querySelector('#portfolioModal p').innerHTML = proj.decs;
    document.getElementById('imgmodal').src = `img/portfolio/${proj.id}.jpg`;
    document.getElementById('modal-link').href = proj.url;
    document.querySelectorAll('#portfolioModal li')[0].innerHTML = `Date: ${humanDate}`;
    document.querySelectorAll('#portfolioModal li')[1].innerHTML = proj.labels.join(', ');

}

function sendEmail() {
    var userFormEmail = document.getElementById('user-form-email').value
    var userFormSubject = document.getElementById('user-form-subject').value
    var userFormMessage = document.getElementById('user-form-message').value
    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=dmitryleshin@gmail.com&su=${userFormSubject}&body=${userFormMessage}`;

    var win = window.open(url, '_blank');
    win.focus();

    document.getElementById('user-form-email').value = '';
    document.getElementById('user-form-subject').value = '';
    document.getElementById('user-form-message').value = '';

}