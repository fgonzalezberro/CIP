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
        $(".principal-container").slideDown();
        $(".principal-container").css("display","block");
        $(".principal-container").html(data);
      }, 2000);
    }
  });
}

// Export Ajax Request Function
export { ajaxRequest };
