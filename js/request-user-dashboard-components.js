// Request Admin Dashboard Components
const requestUserDashboard = (componentUrl) =>{
  $.ajax({
    url: componentUrl,
    beforeSend: () =>{
      $(".loading-section").slideDown();
    },

    success: (data) =>{

      setTimeout(() =>{
        $(".loading-section").slideUp();
        $(".user-main").html('');
        $(".user-main").css("display","block");
        $(".user-main").html(data);
      }, 2000);
    }
  });
}

export { requestUserDashboard };
