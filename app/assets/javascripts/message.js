$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message">
         <div class="message__upper__info">
           <div class="message__upper__info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper__info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <p class="message__text__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
    } else {
     var html =
      `<div class="message">
         <div class="message__upper__info">
           <div class="message__upper__info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper__info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <p class="message__text__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__messages').append(html);
      $('.main_chat__messages').animate({ scrollTop: $('.main_chat__messages')[0].scrollHeight});
      $('input[type="submit"]').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});