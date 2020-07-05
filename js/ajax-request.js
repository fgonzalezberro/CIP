// Call components via Ajax
const ajaxRequest = (componentUrl) =>{
  $.ajax({
    url: componentUrl,
    beforeSend: () =>{
      $(".loading-section").slideDown();
    },

    success: (data) =>{
      setTimeout(() =>{
        $(".loading-section").slideUp();
        $(".main").html('');
        $(".main").css("display","block");
        $(".main").html(data);
      }, 2000);
    }
  });
}

// Export Ajax Request Function
export { ajaxRequest };
